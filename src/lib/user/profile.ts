import { supabaseClient, auth } from '$lib/supabase'

export type UserProfileAttrs = {
    username?: string,
    website?: string,
    avatar_url?:string
}

export const SUPA_STORAGE_BUCKET = 'avatars'

export async function getCurrUserProfile() {
    const user = auth.user()

    return await supabaseClient
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user!.id)
        .single()
}

export async function updCurrUserProfile(attrs: UserProfileAttrs) {
    const user = auth.user()
    const updates = {
        ...attrs,
        id: user!.id,
        updated_at: new Date(),
    }

    return await supabaseClient.from('profiles').upsert(updates)
}

export async function updCurrUserAvatar(file: File) {
    const user = auth.user()
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    let { error: uploadError } = await supabaseClient.storage
        .from(SUPA_STORAGE_BUCKET)
        .upload(filePath, file)

    if (uploadError) {
        throw uploadError
    }

    return await supabaseClient.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
    })
}

export async function getAvatar(url: string) {
    const { data, error: downloadError } = await supabaseClient.storage.from(SUPA_STORAGE_BUCKET).download(url)
    if (downloadError) {
        throw downloadError
    }
    return URL.createObjectURL(data)
}
