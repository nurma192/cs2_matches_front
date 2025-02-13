import {useNavigate} from "react-router-dom";
import type {CreateMatchParams, Match} from "../types/types";
import MyButton from "../components/ui/MyButton";
import {Select, SelectItem} from "@nextui-org/react";
import {MAPS} from "../consts/maps";
import {Controller, type SubmitHandler, useForm} from "react-hook-form";
import MyInput from "../components/ui/MyInput";
import Container from "../components/Container";
import type React from "react";
import {useCreateMatchesMutation} from "../app/features/matches/matchesApi";
import MyCircularProgress from "../components/ui/MyCircularProgress";

type CreateMatchForm = {
    mapId: number;
    team1Name: string;
    team2Name: string;
    mode: number;
    team1Players: string[];
    team2Players: string[];
}

const CreateMatchPage: React.FC = () => {
    const navigate = useNavigate();

    const {control, handleSubmit, watch} = useForm<CreateMatchForm>({
        defaultValues: {
            mapId: 1,
            mode: 5,
            team1Name: 'Arlan',
            team2Name: 'Bars',
            team1Players: ['Zhomart', 'Omar', 'Askhat', 'Zhalgas', 'Dias'],
            team2Players: ['Nurma', 'Dancho', 'Dimash', 'Bekosh', 'Bakhyt'],
        }
    })
    const mode = watch("mode")
    const [createMatch, {isLoading}] = useCreateMatchesMutation()


    const handleSubmitForm: SubmitHandler<CreateMatchForm> = async (data) => {
        console.log(data)
        const body: CreateMatchParams = {
            mapId: data.mapId,
            team1: {
                name: data.team1Name,
                players: data.team1Players.slice(0, data.mode)
            },
            team2: {
                name: data.team2Name,
                players: data.team2Players.slice(0, data.mode)
            },
            teamPlayersCount: data.mode,
        };

        console.log(body)
        createMatch(body).unwrap()
            .then(res => {
                navigate(`/match/${res.matchId}`);
            })
    };

    const handleBack = () => {
        navigate("/");
    }

    const mapItems = Object.values(MAPS).map((mapObj) => ({
        key: mapObj.id,
        label: mapObj.name,
        image: mapObj.image,
    }));

    const modeItems = Array.from({length: 5}).map((_, i) => (
        {
            key: i + 1,
            label: `${i + 1}v${i + 1}`,
        }
    ));


    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <Container>
                <div className="">
                    <MyButton onClick={handleBack} className={"rounded-md"}>Back to Main</MyButton>

                    <div className="w-full flex justify-center">
                        <div className="bg-secondary p-4 rounded-lg shadow-md w-full max-w-xl">
                            <h1 className="text-2xl font-bold mb-4">Create Match</h1>
                            <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
                                <div className={`flex gap-2 flex-col xs:flex-row`}>
                                    <div className="w-full xs:w-[80%]">
                                        <Controller
                                            name="mapId"
                                            control={control}
                                            rules={{required: "Выберите карту"}}
                                            render={({field}) => (
                                                <Select
                                                    {...field}
                                                    items={mapItems}
                                                    label="Выберите карту"
                                                    placeholder="Выберите карту"
                                                    selectedKeys={field.value ? [String(field.value)] : []}
                                                    onSelectionChange={(keys) => {
                                                        const selectedKey = Array.from(keys).pop();
                                                        field.onChange(Number(selectedKey));
                                                    }}
                                                    renderValue={(items) => {
                                                        return items.map((item) => MAPS[Number(item.key)]?.name || '');
                                                    }}
                                                >
                                                    {(map) => (
                                                        <SelectItem key={map.key}>
                                                            <div className="flex gap-2 items-center">
                                                                <img
                                                                    alt={map.label}
                                                                    className="w-[50px] rounded-sm"
                                                                    src={`/images/maps/${map.image}`}
                                                                />
                                                                <p className="text-md">{map.label}</p>
                                                            </div>
                                                        </SelectItem>
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </div>
                                    <div className="w-full xs:w-[20%]">
                                        <Controller
                                            name="mode"
                                            control={control}
                                            render={({field}) => (
                                                <Select
                                                    {...field}
                                                    items={modeItems}
                                                    label="Режим"
                                                    placeholder="Режим"
                                                    selectedKeys={field.value ? [String(field.value)] : []}
                                                    onSelectionChange={(keys) => {
                                                        const selectedKey = Array.from(keys).pop();
                                                        field.onChange(Number(selectedKey));
                                                    }}
                                                >
                                                    {(mode) => (
                                                        <SelectItem key={mode.key}>
                                                            {mode.label}
                                                        </SelectItem>
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </div>

                                </div>

                                <div className="flex gap-5 justify-between flex-col xs:flex-row">
                                    <div className="flex flex-col gap-2 w-full">
                                        <MyInput
                                            name={`team1Name`}
                                            label={`Team1 Name`}
                                            labelPlacement={"outside"}
                                            control={control}
                                            required={true}
                                        />
                                        <hr className={'border-gray'}/>
                                        {Array.from({length: mode}).map((_, i) => (
                                            <MyInput
                                                key={i}
                                                name={`team1Players.${i}`}
                                                label={`Player${i + 1}`}
                                                control={control}
                                                required={true}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 w-full">
                                        <MyInput
                                            name={`team2Name`}
                                            label={`Team2 Name`}
                                            labelPlacement={"outside"}
                                            control={control}
                                            required={true}
                                        />
                                        <hr className={'border-gray'}/>
                                        {Array.from({length: mode}).map((_, i) => (
                                            <MyInput
                                                key={i}
                                                name={`team2Players.${i}`}
                                                label={`Player${i + 1}`}
                                                control={control}
                                                required={true}
                                            />
                                        ))}
                                    </div>
                                </div>


                                <MyButton
                                    type="submit"
                                    color="primary"
                                    className="px-10 bg-opacity-80 text-white rounded "
                                    isDisabled={isLoading}
                                >
                                    {!isLoading ? "Create" : <MyCircularProgress size={"sm"} color={"secondary"}/>}
                                </MyButton>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CreateMatchPage;
