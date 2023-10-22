import { Chip, TableCell, TableRow } from "@mui/material"
import React from "react"

export const DocketList = (props) => {
    return (
        <React.Fragment>
            <TableRow hover role='checkbox'>
                <TableCell>
                    {props.docket.Name}
                </TableCell>
                <TableCell>
                    {props.docket.StartTime}
                </TableCell>
                <TableCell>
                    {props.docket.EndTime}
                </TableCell>
                <TableCell>
                    {props.docket.HoursWorked}
                </TableCell>
                <TableCell>
                    {props.docket.RatePerHour}
                </TableCell>
                <TableCell>
                    {props.docket.SupplierName}
                </TableCell>
                <TableCell>
                    {props.docket.PurchaseOrder}
                </TableCell>
                <TableCell>
                    {/* {props.docket.Records} */}
                    <div style={{ overflowY: 'auto', maxHeight: '200px' }}>
                        {
                            props.docket.Records.map((record, index) => 
                                <Chip
                                    clickable
                                    key={index}
                                    label={record.Description}
                                />
                            )
                        }
                    </div>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}