import React from 'react'

import { NeoMorphPanel } from '../../panels/neomorph-pannel'
import { useUserURLs } from '../../../common/hooks/useUserURLs'
import { StarWarsURL } from '../url'

const UserURLs = () => {
    const urls = useUserURLs()

    return (
        <NeoMorphPanel>
            <h2>Your Recent URLs</h2>
            {urls.map(url => (
                <StarWarsURL
                    key={url}
                    subdomain={url}
                    showInfo={false}
                    style={{ fontSize: '0.85rem', width: '95%', margin: 'auto' }}
                />
            ))}
        </NeoMorphPanel>
    )
}

export default UserURLs