import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const SupplierPurchaseSelectField = (props) => {
    const [supplierNames, setSupplierNames] = useState([]);
    const [selectedSupplierName, setSelectedSupplierName] = useState('');
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState('');

    const supplierNameHandler = (e) => {
        setSelectedSupplierName(e.target.value);
        props.SupplierHandler(e.target.value);
        setSelectedPurchaseOrder('');
    }

    // console.log(selectedSupplierName, 'selectedSupplierName');
    // console.log(data, 'data');

    const purchaseOrderHandler = (e) => {
        setSelectedPurchaseOrder(e.target.value);
        props.PurchaseHandler(e.target.value);
    }
    // console.log(selectedPurchaseOrder, 'selectedPurchaseOrder');

    // console.log(purchaseOrders);

    useEffect(() => {
        if (props.data) {
            // for unique suplier name
            const uniqueSuppliersSet = new Set();
            props.data.forEach((order) => {
              if (order.Supplier) {
                uniqueSuppliersSet.add(order.Supplier);
              }
            });
            const suppliersArray = Array.from(uniqueSuppliersSet);
            setSupplierNames(suppliersArray);
        }
        
    }, [props.data]);
    // console.log(supplierNames);

    useEffect(() => {
        if (selectedSupplierName && props.data) {
            const uniquePurchaseOrdersSet = new Set(); // Use a Set to ensure uniqueness
            props.data
                .filter((order) => order.Supplier === selectedSupplierName && order.PONumber)
                .forEach((order) => {
                    uniquePurchaseOrdersSet.add(order.PONumber);
                });
    
            const uniquePurchaseOrdersArray = Array.from(uniquePurchaseOrdersSet); // Convert Set to Array
            setPurchaseOrders(uniquePurchaseOrdersArray);
        } else {
            setPurchaseOrders([]);
        }
    }, [props.data, selectedSupplierName]);

    return (
        <React.Fragment>
            <FormControl fullWidth>
                <InputLabel>Supplier Name</InputLabel>
                <Select
                    fullWidth
                    required
                    label="Supplier Name"
                    value={selectedSupplierName || ''}
                    onChange={supplierNameHandler}
                >
                    {
                        supplierNames.map((item) => (
                            <MenuItem 
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        )) 
                    }
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Purchase Order</InputLabel>
                <Select
                    fullWidth
                    required
                    label="Purchase Order"
                    value={selectedPurchaseOrder || ''}
                    onChange={purchaseOrderHandler}
                >
                    {
                        purchaseOrders.map((item) => (
                            <MenuItem 
                                key={item}
                                value={item}
                            >
                                {item}
                            </MenuItem>
                        )) 
                    }
                </Select>
            </FormControl>
        </React.Fragment>
    )
}