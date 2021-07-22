import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export function Person(props) {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
        {props.columns.map((column) => {
            const value = props.row[column.id];
            return (
            <TableCell key={column.id} align={column.align}>
                {value}
            </TableCell>
            );
        })}
    </TableRow>
    );
}