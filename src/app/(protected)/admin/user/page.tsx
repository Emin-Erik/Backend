"use client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Input} from "@nextui-org/input";
import {Button, Select, Selection, SelectItem} from "@nextui-org/react";
import {$Enums} from ".prisma/client";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Role = $Enums.UserRole;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function App() {
    const [user, setUsers] = useState<any>();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [open, setOpen] = React.useState(false);
    const [openDanger, setOpenDanger] = React.useState(false);

    const handleSucces = () => {
        setOpen(true);
    };

    const handleError = () => {
        setOpenDanger(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    useEffect(() => {
        const callAPI = async () => {
            try {
                const res = await fetch(
                    `/api/user/GET?id=` + id,
                );
                const data = await res.json();
                setUsers(data)
            } catch (err) {
                console.log(err);
            }
        };
        callAPI()
    }, []);

    const [email, setEmail] = useState(user?.user?.email);
    const [name, setName] = useState(user?.user?.name);
    const [role, setRole] = useState(user?.user?.role);
    const roleOptions = [Role.USER, Role.ADMIN];
    // @ts-ignore
    const [value, setValue] = React.useState<Selection>(new Set([]));

    const updateUser = async () => {
        try {
            const queryParams = [];

            if (name !== undefined) {
                queryParams.push(`username=${encodeURIComponent(name)}`);
            }

            if (email !== undefined) {
                queryParams.push(`email=${encodeURIComponent(email)}`);
            }

            if (role !== undefined) {
                queryParams.push(`role=${encodeURIComponent(role)}`);
            }

            const queryString = queryParams.join('&');

            const response = await fetch(`/api/user/PUT?id=${id}${queryString.length ? '&' + queryString : ''}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
            });

            console.log(response)

            if (!response.ok) {
                // Handle non-successful response (e.g., show an error message)
                handleError();
                return;
            } else {
                handleSucces();
            }

            // Handle successful response if needed
            const responseData = await response.json();
            console.log('User updated successfully:', responseData);
        } catch (error) {
            console.error('Error updating user:', error);
        }


    };


    return (

        <>
        {!user?.user ? (
            <>
            Loading ...
            </>
            ) : (
            <>
        {user?.user?.name}
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={open} autoHideDuration={2000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    User updated
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={openDanger} autoHideDuration={2000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    Error updating user
                </Alert>
            </Snackbar>
            <div className="w-full flex flex-row flex-wrap gap-4 mt-3">
            <Input
                isReadOnly
                defaultValue={user?.user?.id}
                placeholder={user?.user?.id}
                label="ID"
                labelPlacement="outside"
                className="max-w-xs"
            />
            <br/>
            <Input
                defaultValue={user?.user?.email}
                placeholder={user?.user?.email}
                label="Email"
                labelPlacement="outside"
                className="max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <Input
                defaultValue={user?.user?.name}
                placeholder={user?.user?.name}
                label="Name"
                labelPlacement="outside"
                className="max-w-xs"
                onChange={(e) => setName(e.target.value)}
            />
                <Input
                    defaultValue={user?.user?.plan}
                    placeholder={user?.user?.plan}
                    label="Plan"
                    labelPlacement="outside"
                    className="max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    defaultValue={user?.user?.gender}
                    placeholder={user?.user?.gender}
                    label="Geschlecht"
                    labelPlacement="outside"
                    className="max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    defaultValue={user?.user?.height}
                    placeholder={user?.user?.height}
                    label="Größe"
                    labelPlacement="outside"
                    className="max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    defaultValue={user?.user?.activity}
                    placeholder={user?.user?.activity}
                    label="Aktivität"
                    labelPlacement="outside"
                    className="max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    defaultValue={user?.user?.weight}
                    placeholder={user?.user?.weight}
                    label="Gewicht"
                    labelPlacement="outside"
                    className="max-w-xs"
                    onChange={(e) => setName(e.target.value)}
                />
            <br/>
            <Select
                label="Role"
                variant="bordered"
                placeholder={user?.user?.role}
                labelPlacement="outside"
                selectedKeys={value}
                className="max-w-xs"
                onSelectionChange={setValue}
                onChange={(e) => setRole(e.target.value)}
            >
                {roleOptions.map((roleOption) => (
                    <SelectItem key={roleOption} value={roleOption}>{roleOption}</SelectItem>
                ))}
            </Select>
            </div>
            <br/>
            {user?.user?.emailVerified ? (<p>Email verified</p>) : (<p>Email not verified</p>)}
            <br/>
            <Button onClick={updateUser}><p>Safe</p></Button>
            </>
)}

        </>
    );
}
