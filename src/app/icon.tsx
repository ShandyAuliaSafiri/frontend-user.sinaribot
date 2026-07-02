import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

export default function Icon() {
  const logoData = readFileSync(join(process.cwd(), 'public/images/favicon-sinari.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'transparent',
          position: 'relative'
        }}
      >
        <img 
          src={logoBase64} 
          width="512" 
          height="512" 
          style={{ 
             width: '100%', 
             height: '100%', 
             objectFit: 'cover',
             borderRadius: '50%'
          }} 
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
