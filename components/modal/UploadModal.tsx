'use client'
import uniqid from 'uniqid'
import React, { useState } from 'react'
import Modal from './Modal'
import useUploadModal from '@/hooks/useUploadModal'
import { type FieldValues, useForm, SubmitHandler, Field } from 'react-hook-form'
import Input from '../ui/Input'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import Button from '../ui/Button'

export default function UploadModal() {

    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const {
        register,
        handleSubmit: reactHookFormHandleSubmit,
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })
    const handleChange = (open:boolean) => {
        if(!open) {
            reset()
            uploadModal.Close()
        }
    }

    const handleSubmit: SubmitHandler<FieldValues> = async (values) => {

        try {
            setIsLoading(true)
            const imageFile = values?.image?.[0]
            const songFile = values.song?.[0]

            if(!imageFile || !songFile || !user) {
                toast.error('Missing fields')
                return
            }

            const uid = uniqid()

            //Upload song
            const {
                data: songData,
                error: songError,
            } = await supabaseClient
                .storage
                //bucket
                .from('songs')
                .upload(`song-${values.title}-${uid}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                })
            
            if(songError) {
                setIsLoading(false)
                toast.error('Failed song upload')
                return
            }

            //Upload image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient
                .storage
                //bucket
                .from('images')
                .upload(`image-${values.title}-${uid}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                })
            
            if(imageError) {
                setIsLoading(false)
                toast.error('Failed image upload')
                return
            }

            const {
                error: supabaseError
            } = await supabaseClient
            .from('songs')
            .insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path
            })

            if(supabaseError) {
                return toast.error(supabaseError.message)
            }

            router.refresh()
            setIsLoading(false)
            toast.success('Song created')
            reset()
            uploadModal.Close()
        }
        catch (error) {
            toast.error('Something went wrong')
        }
        finally {
            setIsLoading(false)
        }
    }
  return (
    <Modal
    title='Add a Song'
    description='Upload mp3 file'
    isOpen={uploadModal.isOpen}
    onChange={ handleChange }
    >
        <form 
        onSubmit={reactHookFormHandleSubmit(handleSubmit)}
        className='flex flex-col gap-y-4'>
            <Input
                id='title'
                disabled={isLoading}
                {...register('title', { required: true })}
                placeholder='Song title'
            />
            <Input
                id='author'
                disabled={isLoading}
                {...register('author', { required: true })}
                placeholder='Song author'
            />
            <div>
                <div className='pb-1'> Select a song file</div>
                <Input
                    id='song'
                    type='file'
                    accept='.mp3'
                    disabled={isLoading}
                    {...register('song', { required: true })}
                    
                />
            </div>
            <div>
                <div className='pb-1'> Select an image</div>
                <Input
                    id='image'
                    type='file'
                    accept='image/*'
                    disabled={isLoading}
                    {...register('image', { required: true })}
                    
                />
            </div>
            <Button 
            className='rounded-md'
            disabled={isLoading} type='submit'>Create</Button>
        </form>
    </Modal>
  )
}
