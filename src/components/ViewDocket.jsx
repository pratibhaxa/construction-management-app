import React, { useEffect, useState } from "react"
import { DocketTab } from "../UI/DocketTab"
import { ViewDocketColumns } from "./ViewDocketColumns"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import { DocketList } from "./DocketList";

export const ViewDocket = () => {
    const [docketList, setDocketList] = useState([]);
    const docketsCollectionRef = collection(db, "dockets");

    const getDocketList = async () => {
        try {
            const data = await getDocs(docketsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            setDocketList(filteredData);
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getDocketList();
      }, []);

    return (
        <React.Fragment>
            {/* <DocketTab /> */}
            <Paper
                sx={{
                    width: '100%',
                    // overflow: 'scroll'
                }}
            >
                <TableContainer sx={{ maxHeight: 750, width: '100%' }}>
                    <Table aria-label='sticky table'>
                        <ViewDocketColumns />
                        <TableBody>
                            {
                                docketList.map((docket) => {
                                    return (
                                        <DocketList key={docket.id} docket = {docket} />
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            
            
        </React.Fragment>
    )
}