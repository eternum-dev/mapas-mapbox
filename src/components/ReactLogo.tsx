import reactLogo from '../assets/react.svg'


export const ReactLogo = () => {
    return (
        <>
            <img
                src={reactLogo}
                alt="react logo"
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '100px',
                    zIndex: 100,
                }}
            />
        </>
    )
}