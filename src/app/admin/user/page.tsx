"use client";
import React, {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {Input} from "@nextui-org/input";
import {Button, Select, Selection, SelectItem} from "@nextui-org/react";
import {$Enums} from ".prisma/client";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Role = $Enums.Role;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function App() {
    const [user, setUsers] = useState<any>();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
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
    const [username, setUsername] = useState(user?.user?.username);
    const [role, setRole] = useState(user?.user?.role);
    const roleOptions = [Role.USER, Role.ADMIN];
    // @ts-ignore
    const [value, setValue] = React.useState<Selection>(new Set([]));

    const updateUser = async () => {
        try {
            await fetch("/api/user/PUT?id=" + id + "&username=" + username + "&email=" + email + "&role=" + role, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
            });
        } catch (error) {
            console.log("error", error);
        }
        {
            handleClick();
        }
    };


    return (

        <>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} open={open} autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <Input
                isReadOnly
                defaultValue={user?.user?.id}
                className="max-w-xs"
            />
            <br/>
            <Input
                defaultValue={user?.user?.email}
                className="max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
            />
            <br/>
            <Input
                defaultValue={user?.user?.username}
                className="max-w-xs"
                onChange={(e) => setUsername(e.target.value)}
            />
            <br/>
            <Select
                label="Role"
                variant="bordered"
                placeholder={user?.user?.role}
                selectedKeys={value}
                className="max-w-xs"
                onSelectionChange={setValue}
                onChange={(e) => setRole(e.target.value)}
            >
                {roleOptions.map((roleOption) => (
                    <SelectItem key={roleOption} value={roleOption}>{roleOption}</SelectItem>
                ))}
            </Select>
            <br/>
            {user?.user?.emailVerified ? (<p>Email verified</p>) : (<p>Email not verified</p>)}
            <br/>
            <Button onClick={updateUser}><p>Safe</p></Button>

        </>

    );
}
