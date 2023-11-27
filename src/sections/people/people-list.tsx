import { FC, useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import useSelectedRows from "../../hooks/useSelectedRows";
import PropTypes from "prop-types";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import WorkspacePremiumSharpIcon from "@mui/icons-material/WorkspacePremiumSharp";
import {
  Box,
  Card,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Checkbox,
  TablePagination,
} from "@mui/material";
import { Profile } from "../../types/profile";
import { paths } from "../../paths";

interface ProfileProps {
  people: Profile[];
}

const rowsPerPageOptions = [10, 15, 20];

export const PeopleList: FC<ProfileProps> = (props) => {
  const { people } = props;
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedRows, handleSelectRow, clearSelectedRows] = useSelectedRows();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleSingleItem = (id: number) => {
    router.push(paths.activeProfiles.index + "/" + id);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = people.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card>
      {displayedRows.length > 0 && (
        <>
          <Table sx={{ minWidth: 300 }}>
            <TableBody>
              {displayedRows &&
                displayedRows.map((item: any, index: number) => {
                  return (
                    <TableRow
                      hover
                      key={item.profileId}
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleSingleItem(item.profileId)}
                    >
                      <TableCell sx={{ width: "100px" }}>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          {item.profilePicture ? (
                            <Box
                              sx={{
                                alignItems: "center",
                                backgroundColor: "neutral.50",
                                backgroundImage: `url(${item.profilePicture})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                borderRadius: 2,
                                display: "flex",
                                height: 120,
                                justifyContent: "center",
                                overflow: "hidden",
                                width: 120,
                              }}
                            />
                          ) : (
                            <Box
                              sx={{
                                alignItems: "center",
                                backgroundColor: "#eaecec",
                                borderRadius: 1,
                                display: "flex",
                                height: 120,
                                justifyContent: "center",
                                width: 120,
                              }}
                            >
                              <SvgIcon>
                                <Image01Icon />
                              </SvgIcon>
                            </Box>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Stack alignItems="center" direction="row" spacing={2}>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: "5px",
                              }}
                            >
                              <Typography variant="h5">
                                {item.firstName} {item.lastName}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  ml: "10px",
                                }}
                              >
                                {item.premium ? (
                                  <WorkspacePremiumSharpIcon />
                                ) : null}
                              </Box>
                            </Box>
                            <Box sx={{ display: "flex" }}>
                              <Typography
                                color="text.secondary"
                                variant="body2"
                              >
                                {item.subTitle}
                              </Typography>
                            </Box>
                            <Typography color="text.secondary" variant="body2">
                              {item.industry}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {item.location && (
                          <Typography
                            color="text.secondary"
                            sx={{ fontWeight: 500, ml: "5px" }}
                            variant="body2"
                          >
                            {item.location.default}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.summary && (
                          <Typography
                            color="text.secondary"
                            variant="subtitle2"
                            component="div"
                            noWrap
                            style={{ maxWidth: "300px" }}
                          >
                            {item.summary}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <Box
                          sx={{
                            borderRadius: 1.5,
                            px: 1,
                            py: 0.5,
                            display: "inline-block",
                          }}
                        >
                          <Typography variant="subtitle2">
                            #{index + 1}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={people.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Card>
  );
};

PeopleList.propTypes = {
  people: PropTypes.array.isRequired,
};

export default PeopleList;
