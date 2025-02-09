import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreateMatchParams, Match } from "../types";

const CreateMatchPage: React.FC = () => {
    const navigate = useNavigate();

    const [mapId, setMapId] = useState<number>(1);
    const [team1, setTeam1] = useState<string>("Alice,Bob,Charlie,Dave,Eve");
    const [team2, setTeam2] = useState<string>("John,Mike,Nick,Oscar,Paul");
    const [teamPlayersCount, setTeamPlayersCount] = useState<number>(5);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const t1Array = team1.split(",").map((s) => s.trim());
        const t2Array = team2.split(",").map((s) => s.trim());

        const body: CreateMatchParams = {
            mapId,
            team1: t1Array,
            team2: t2Array,
            teamPlayersCount,
        };

        try {
            const response = await fetch("http://localhost:4000/matches", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Failed to create match");
            }

            const createdMatch: Match = await response.json();
            navigate(`/match/${createdMatch.matchId}`);
        } catch (error) {
            console.error("Error:", error);
            alert("Error creating match");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Link
                to="/"
                className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Back to Main
            </Link>

            <div className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
                <h1 className="text-2xl font-bold mb-4">Create Match</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-semibold mb-1">Map ID:</label>
                        <input
                            type="number"
                            className="w-full border rounded px-2 py-1"
                            value={mapId}
                            onChange={(e) => setMapId(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">
                            Team1 (comma-separated):
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-2 py-1"
                            value={team1}
                            onChange={(e) => setTeam1(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">
                            Team2 (comma-separated):
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-2 py-1"
                            value={team2}
                            onChange={(e) => setTeam2(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold mb-1">
                            Team Players Count:
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded px-2 py-1"
                            value={teamPlayersCount}
                            onChange={(e) => setTeamPlayersCount(Number(e.target.value))}
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateMatchPage;
