import React, {useState} from "react";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import {TacoAwardRequest} from "../models/TacoAwardRequest";
import {SpaceTacosApi} from "../api/SpaceTacosApi";
import {UserSummary} from "../models/UserSummary";
import useTacos from "../hooks/useTacos";

export interface GiveTacoProps {
    tacoCandidates: UserSummary[];
    tacoAllocation: number;
    onAllocationChanged(change: number): void;
}

function GiveTaco({tacoCandidates, tacoAllocation, onAllocationChanged}: GiveTacoProps){
    const [selectedUser, setSelectUser] = useState<string | undefined>(undefined);
    const [toGiveCount, setToGiveCount] = useState<number>(1);
    const [note, setNote] = useState("");
    const {refresh} = useTacos();

    const handleChange = (event: SelectChangeEvent) => {
        setSelectUser(event.target.value as string);
    };

    async function handleGiveTacos() {
        if(!selectedUser){
            return;
        }
        const request: TacoAwardRequest = {
            count: toGiveCount,
            note: note,
            payeeId: selectedUser
        }
        const result = await SpaceTacosApi.giveTaco(request);
        onAllocationChanged(result.count);
        setNote("");
        setSelectUser(undefined);
        setToGiveCount(1);
        await refresh();
    }
    return (
        <Box bgcolor={"darkslateblue"} width={"80vw"} display={"flex"} alignItems={"center"}
             justifyContent={"start"} p={2} flexDirection={"column"} marginTop={2}>
            <Typography variant={"h3"} color={"lightsteelblue"} marginBottom={6}>
                Give a Taco
            </Typography>
            <Typography variant={"h6"} color={"lightsteelblue"} marginBottom={6}>
                You have {tacoAllocation} taco(s) available to give.
            </Typography>
            <Box bgcolor={"white"} width={"90%"} display={"flex"} alignItems={"center"}
                 justifyContent={"start"} p={2} flexDirection={"column"}>
                <FormControl fullWidth>
                    <InputLabel id="select-payee-label">Who gets taco(s)</InputLabel>
                    <Select
                        labelId="select-payee-label"
                        id="select-payee"
                        value={selectedUser}
                        label="Who gets taco(s)"
                        onChange={handleChange}>
                        {tacoCandidates.map(x => <MenuItem value={x.userId}>{x.username}</MenuItem>)}
                    </Select>
                </FormControl>
                <Box display={"flex"} justifyContent={"space-around"} alignItems={"center"}
                     flexDirection={"row"} width={"100%"} marginTop={2}>
                    <InputLabel id="select-payee-label">How many taco(s)</InputLabel>
                    <Box width={"60%"}>
                        <Slider
                            aria-label="tacoCount"
                            defaultValue={1}
                            valueLabelDisplay="auto"
                            step={1}
                            value={toGiveCount}
                            onChange={(e, value) => setToGiveCount(Array.isArray(value) ? value[0] : value)}
                            marks
                            min={1}
                            max={5}
                        />
                    </Box>
                </Box>
                <Box marginTop={2} width={"100%"}>
                    <TextField
                        id="taco-note"
                        label="Why get taco(s)"
                        multiline
                        fullWidth
                        rows={5}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </Box>
                <Box marginTop={2}>
                    <Button variant={"contained"} disabled={note === "" || !selectedUser}
                            sx={{bgcolor: "darkslateblue"}} onClick={handleGiveTacos}>
                        GIVE {toGiveCount} TACO(S)
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(GiveTaco);