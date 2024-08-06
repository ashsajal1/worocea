"use client"

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose } from '@radix-ui/react-dialog';
import { WorkspaceTypes } from './ws-type';
import { z } from 'zod';
import ErrorText from '@/components/error-text';
import {useTransition} from  'react'
import { createWorkSpace } from './actions';

const workspaceSchema = z.object({
    name: z.string().min(1, { message: "Workspace name is required" }),
    type: z.string().min(1, { message: "Workspace type is required" }),
});

export type WorkspaceForm = z.infer<typeof workspaceSchema>;

export default function WsDialog() {
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<WorkspaceForm>({
        resolver: zodResolver(workspaceSchema),
    });

    const onSubmit: SubmitHandler<WorkspaceForm> = async (data) => {
        // console.log("Workspace created:", data);
        await startTransition(async () => {
            await createWorkSpace(data)
        }) 
        // Clear fields after submission if needed
        setValue('name', '');
        setValue('type', '');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create workspace</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>Create workspace</DialogHeader>
                <Label>Enter your workspace name:</Label>
                <Input
                    placeholder='Enter workspace name eg, Family, College...'
                    {...register('name')}
                    disabled={pending}
                />
                {errors.name && <ErrorText text={errors.name.message as string} />}

                <Label>Enter your workspace type:</Label>
                <Select disabled={pending} onValueChange={(value) => setValue('type', value)}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Types</SelectLabel>
                            {WorkspaceTypes.map(wst => (
                                <SelectItem key={wst} value={wst}>
                                    {wst}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {errors.type && <ErrorText text={errors.type.message as string} />}

                <DialogFooter>
                    <DialogClose disabled={pending}>
                        <Button disabled={pending} variant={'ghost'}>Cancel</Button>
                    </DialogClose>

                    <Button disabled={pending} onClick={handleSubmit(onSubmit)}>{pending? "Creating":"Create"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}