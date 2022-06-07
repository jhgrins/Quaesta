import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Autocomplete, Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { debounce } from "debounce";

import { useLazyQuery, useQuery } from "@apollo/client";
import { GameSearch, GetSideBarProfile } from "../../graphql/query";

import Logo from "../UI/Logo";

const useStyles = makeStyles((theme: any) => ({
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6)
    }
}));

const NavBar = () => {
    return (
        <Box sx={{ display: "flex", p: 1.5, pl: 3, pr: 3 }}>
            <Logo height={40} />
            <Menu />
            <Search />
            <Profile />
        </Box>
    );
};

const Menu = () => {
    return (
        <Box sx={{ display: "flex", pl: 4, pr: 2 }}>
            <Button>Menu</Button>
        </Box>
    );
};

const Search = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [doQuery, { called, loading, data }] = useLazyQuery(GameSearch, {
        variables: {
            name: text
        }
    });

    const bouncedQuery = debounce(doQuery, 500);
    const ready = called && !loading;

    return (
        <Box sx={{ flexGrow: 1, p: 1, pl: 2, pr: 2 }}>
            <Autocomplete
                autoSelect
                size={"small"}
                options={ready ? data.gameSearch : []}
                getOptionLabel={(option: { name: string }) => option.name}
                onChange={(event, newOption: any) => navigate(`/app/game/${newOption.id}`)}
                inputValue={text}
                onInputChange={(event, newText) => {
                    setText(newText);
                    bouncedQuery();
                }}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                renderInput={(params) => <TextField {...params} />}
                renderOption={(props, option: { name: string }, { inputValue }) => {
                    const matches = match(option.name, inputValue);
                    const parts = parse(option.name, matches);
                    return (
                        <li {...props}>
                            <div>
                                {parts.map(
                                    (part: { highlight: boolean; text: string }, index: number) => (
                                        <span
                                            key={index}
                                            style={{
                                                fontWeight: part.highlight ? 700 : 400
                                            }}
                                        >
                                            {part.text}
                                        </span>
                                    )
                                )}
                            </div>
                        </li>
                    );
                }}
            />
        </Box>
    );
};

const Profile = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(GetSideBarProfile);

    if (loading || error) {
        return null;
    }

    return (
        <Box sx={{ pl: 8 }}>
            <Link to={"/app/profile"} className={"no-line"}>
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ height: "100%" }}
                >
                    <Typography sx={{ pr: 3 }}>{data.selfLookup.username}</Typography>
                    <Avatar
                        alt={"Profile"}
                        src={data.selfLookup.avatar}
                        className={classes.avatar}
                    />
                </Box>
            </Link>
        </Box>
    );
};

export default NavBar;
