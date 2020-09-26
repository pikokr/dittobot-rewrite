import React from 'react'
import fetch from 'node-fetch'
import styled, { createGlobalStyle } from 'styled-components'
import { Link } from 'react-router-dom'

const Global = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: var(--background-primary);
        color: var(--text-normal);
        font-family: Whitney, "Apple SD Gothic Neo", NanumBarunGothic, "맑은 고딕", "Malgun Gothic", Gulim, 굴림, Dotum, 돋움, "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    @media (prefers-color-scheme: light) {
        :root {
            --text-normal: #2e3338;
            --background-primary: #fff;
        }
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --text-normal: #dcddde;
            --background-primary: #36393f;
        }
    }
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Img = styled.img`
    border-radius: 50%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
`

const Button = styled.button`
    color: #fff;
    background-color: #7289da;
    cursor: pointer;
    height: 32px;
    min-width: 60px;
    min-height: 32px;
    border: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    padding: 2px 16px;
    border-radius: 3px;
    outline: none;
    transition: background-color .17s ease,color .17s ease;

    &:hover {
        background-color: #677bc4;
    }
`

interface State {
    user: null | {
        users: number
        guilds: number
        username: string
        avatar: string
        id: string
    }
    catch: boolean
}

class Main extends React.Component {
    state: State = {
        user: null,
        catch: false
    }

    async componentDidMount() {
        const user = await fetch('http://test.ditto7890.xyz:5000/api/user').then(res => res.json()).catch(() => this.setState({ catch: true }))
        this.setState({ user })

        if (this.state.user?.username) document.title = this.state.user?.username
    }

    render() {
        return (
            <Container onDragStart={event => event.preventDefault()}>
                <Global />
                {this.state.user ? (
                    <>
                        <h1>{this.state.user.username}</h1>
                        <Img src={`https://cdn.discordapp.com/avatars/${this.state.user.id}/${this.state.user.avatar}.png`} alt={this.state.user.username} />
                        <h3>{this.state.user.users}명의 유저, {this.state.user.guilds}개의 서버</h3>
                        <Link to={{
                            pathname: `https://discord.com/api/oauth2/authorize?client_id=${this.state.user.id}&permissions=2147483647&scope=bot`
                        }} target="_blank">
                            <Button>초대</Button>
                        </Link>
                    </>
                ) : <h1>{this.state.catch ? '정보를 불러올 수 없습니다' : 'Loading...'}</h1>}
            </Container>
        )
    }
}

export default Main