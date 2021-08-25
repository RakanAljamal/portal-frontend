import React from 'react';
import { TableFooter, TableRow } from "@material-ui/core";
import TablePagination from "@material-ui/core/TablePagination";

const TableUserFooter = ({ users, rowsPerPage,page, handleChangePage, handleChangeRowsPerPage, TablePaginationActions }) => {
    return (
        <div>
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        colSpan={3}
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActions}
                    />
        </div>
    );
};

export default TableUserFooter;
