'use client';

import { useRouter } from "next/navigation";
import { DefaultButton } from "../Button/Index";

export default function EditTeamButton({teamId}: {teamId: number}){

    const router = useRouter();

    return <DefaultButton onClick={()=>{router.push(`/team/${teamId}/edit`)}}>Edit</DefaultButton>
}