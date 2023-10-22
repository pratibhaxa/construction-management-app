import { Box, Button, FormControl, Stack, TextField, Typography, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions } from "@mui/material";
import { DateTimePicker, LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SupplierPurchaseSelectField } from "./SupplierPurchaseSelectField";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import JSONdata from './data.json';
import dayjs from "dayjs";
import { Alert, AlertTitle } from "@mui/lab";


export const CreateDocketForm = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [hoursWorked, setHoursWorked] = useState('');
    const [ratePerHour, setRatePerHour] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [purchaseOrder, setPurchaseOrder] = useState('');
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

    const handleSuccessAlertClose = () => {
        setIsSuccessAlertOpen(false);
      };
      
    // const resetForm = () => {
    //     setName("");
    //     setStartTime("");
    //     setEndTime("");
    //     setHoursWorked("");
    //     setRatePerHour("");
    //     setSupplierName("");
    //     setPurchaseOrder("");
    //     setIsSuccessAlertOpen(false);
    //     setSupplierName("");
    //     setPurchaseOrder("");
    // };
      

    useEffect(() => {
        if (JSONdata) {
            setData(JSONdata);
        }
        SupplierHandler();
        PurchaseHandler();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedStartTime = dayjs(startTime).format();
        const formattedEndTime = dayjs(endTime).format();

        // Create a new object with the selected data
        const docketData = {
            Name: name,
            StartTime: formattedStartTime,
            EndTime: formattedEndTime,
            HoursWorked: hoursWorked,
            RatePerHour: ratePerHour,
            SupplierName: supplierName,
            PurchaseOrder: purchaseOrder,
        };

        const selectedRecords = data.filter((record) => record.PONumber === purchaseOrder);
        docketData.Records = selectedRecords;

        try {
            const docRef = await addDoc(collection(db, "dockets"), docketData);
            // console.log("Document written with ID: ", docRef.id);
            // setIsAlertOpen(true); // Show the success alert
            // setIsDialogOpen(true); // Open the dialog
            setIsSuccessAlertOpen(true);
            setIsDialogOpen(true);

            setTimeout(() => {
                window.location.reload();
              }, 2000);

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const SupplierHandler = (selectedSupplierName) => {
        setSupplierName(selectedSupplierName);
        // console.log(selectedSupplierName, 'selectedSupplierName');
    }

    const PurchaseHandler = (selectedPurchaseOrder) => {
        setPurchaseOrder(selectedPurchaseOrder);
        // console.log(selectedPurchaseOrder, 'selectedPurchaseOrder');
    }

    // useEffect(() => {
    //     console.log(supplierName, 'supplierName');
    // }, [supplierName]);
    
    // useEffect(() => {
    //     console.log(purchaseOrder, 'purchaseOrder');
    // }, [purchaseOrder]);

    return (
        <React.Fragment>
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    backgroundColor: 'background.paper',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        maxWidth:550,
                        px: 3,
                        py: '100px',
                        width: '100%'
                    }}
                >
                    <Dialog
                        open={isSuccessAlertOpen}
                        onClose={handleSuccessAlertClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            The data has been successfully sent to Firebase.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                handleSuccessAlertClose();
                                // resetForm();
                            }} autoFocus>
                            OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <div>
                        <Stack
                            spacing={1}
                            sx={{
                                mb: 3
                            }}
                        >
                            <Typography variant="h4">
                                Create Docket
                            </Typography>
                        </Stack>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField 
                                    fullWidth
                                    required
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        fullWidth
                                        required
                                        label="Start Time"
                                        type="datetime-local"
                                        value={startTime}
                                        selected={startTime}
                                        startTime={startTime}
                                        onChange={date => setStartTime(date)}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <MobileDatePicker
                                        fullWidth
                                        required
                                        label="End Time"
                                        type="datetime-local"
                                        value={endTime}
                                        selected={endTime}
                                        endDate={endTime}
                                        minDate={startTime}
                                        onChange={date => setEndTime(date)}
                                    />
                                </LocalizationProvider>
                                <TextField 
                                    fullWidth
                                    required
                                    label="No. of Hours Worked"
                                    type="number"
                                    value={hoursWorked}
                                    onChange={(e) => setHoursWorked(e.target.value)}
                                />
                                <TextField 
                                    fullWidth
                                    required
                                    label="Rate per Hour"
                                    type="number"
                                    value={ratePerHour}
                                    onChange={(e) => setRatePerHour(e.target.value)}
                                />
                                <SupplierPurchaseSelectField SupplierHandler = {SupplierHandler} PurchaseHandler = {PurchaseHandler} data = {data} />
                            </Stack>
                            <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                background="teal"
                                variant="contained"
                            >
                                Create
                            </Button>
                        </form>
                        {isAlertOpen && ( // Display the alert when isAlertOpen is true
                            <Alert severity="success" onClose={() => setIsAlertOpen(false)}>
                                <AlertTitle>Success</AlertTitle>
                                Data sent to Firebase successfully.
                            </Alert>
                        )}
                    </div>
                </Box>
            </Box>
        </React.Fragment>
    )
}