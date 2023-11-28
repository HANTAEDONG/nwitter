import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import { auth } from "../firebase";

const HomeWrapper = styled.div``;

export default function Home() {
    const logOut = () => {
        auth.signOut;
    }
    // 로그 아웃
    return (
        <h1>
            <HomeWrapper>
                <PostTweetForm />
            </HomeWrapper>
            <button onClick={logOut}>Log Out</button>
        </h1>
    );
}
