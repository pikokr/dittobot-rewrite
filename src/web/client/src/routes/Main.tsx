import React from 'react'
import fetch from 'node-fetch'

class Main extends React.Component {
    async componentDidMount() {
        const sans = await (await fetch('http://localhost:5000/api')).json()
        console.log(sans)
    }

    render() {
        return (
            <>
                <h1>ㅁㄴㅇㄹ</h1>
            </>
        )
    }
}

export default Main