import React, { ComponentType, ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "../store";
import { getUserInfo } from "../thunks/userList";
import DashboardLayout from "../layouts/Dashboard";
import { useRouter } from "next/router";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import Page404 from "../pages/404";
import { ROLE } from "../constants";
interface WithAccessControlProps<T> {
  props: T;
}

function withAccessControl<T extends EmotionJSX.IntrinsicAttributes>(
  requiredRoles: number[]
) {
  return function WithAccessControl<P extends WithAccessControlProps<T>>(
    PageComponent: ComponentType<P["props"]>
  ) {
    function WrappedPageComponent(props: P): ReactElement {
      const dispatch = useDispatch();
      const router = useRouter();
      useEffect(() => {
        dispatch(getUserInfo());
      }, [dispatch]);

      const userInfo = useSelector((state) => state.users.userInfo);

      if (userInfo?.role) {
        if (!requiredRoles.includes(userInfo.role as number)) {
          return <Page404 />;
        }
      }
      return (
        <DashboardLayout>
          <PageComponent {...props.props} />
        </DashboardLayout>
      );
    }
    return WrappedPageComponent;
  };
}

export default withAccessControl;
