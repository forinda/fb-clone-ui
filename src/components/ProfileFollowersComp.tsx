import React from 'react'
import { IUserState } from 'state/types'

type FollowProps = {
    follows: Array<IUserState>
    title: string
}
const ProfileFollowersComp = ({ follows, title }: FollowProps) => {
    return (
        <div className='flex flex-col p-4 items-center space-y-4 w-full'>
            {follows.length > 0 ? follows.map((person) => (
                <div className='shadow-[0_0_.5rem_.2rem_#a2a4a6dc] p-4 rounded-md w-full max-w-[40rem]' key={person._id}>
                    <div className='flex items-center gap-4'>
                        <div>
                            <img
                                src={person.avatar ? person.avatar : '/user.svg'}
                                alt=''
                                className='w-20 h-20 rounded-full'
                            />
                        </div>
                        <div>
                            <h2>{person.username}</h2>
                            <div>
                                <span>2k</span>
                            </div>
                        </div>
                    </div>
                    <p className='max-w-[60ch]'>
                        {person.bio}
                    </p>
                </div>
            )) : (<div>
                <h1>You have no {title} yet</h1>
            </div>)}
        </div>
    )
}

export default ProfileFollowersComp