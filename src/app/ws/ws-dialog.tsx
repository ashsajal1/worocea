"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DialogClose } from '@radix-ui/react-dialog'
import { WorkspaceTypes } from './ws-type'

export default function WsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create workspace</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>Create workspace</DialogHeader>
                <Label>Enter your workspace name:</Label>
                <Input placeholder='Enter workspace name eg, Family, College...' type="text" />
                <Label>Enter your workspace type:</Label>
                <Select>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Colors</SelectLabel>
                            {WorkspaceTypes.map(wst => (
                                <SelectItem key={wst} value={wst}>
                                    {wst}
                                </SelectItem>
                            ))}
                        </SelectGroup>

                    </SelectContent>
                </Select>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'ghost'}>Cancel</Button>
                    </DialogClose>

                    <Button>Create</Button>
                </DialogFooter>

            </DialogContent>

        </Dialog>
    )
}
