// 트윗창
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import styled from "styled-components";


export const TweetForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

// 트윗 창 testarea
export const TweetTextArea = styled.textarea`
    border:2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: None;
    &::placeholder {    // placeholder의 폰트 바꿔주기, 가상요소 선택자
        font-size: 16px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    &:focus {   // 텍스트 영역이 focuse 됐을 때 설정
        outline: none;
        border-color: #1d9bf0;
    }
`;

export const TweetAttachFileButton = styled.label`
     padding: 10px 0px;
     color: #1d9bf0;
     text-align: center;
     border-radius: 20px;
     border:1px solid #1d9bf0;
     font-size:14px;
     font-weight: 600;
     cursor: pointer;
`;

export const TweetAttachFileInput = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none; // input 테두리 안보이게
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export const TweetSubmitBtn = styled.input`
    background-color: #1d9bf0;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,   // hover (마우스 오버 상태)
    &:active {   // active (클릭하고 있는 상태)
        opacity: 0.9;   // opacity는 투명도
    }
`;


export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState(""); // 컨텐츠 내용 저장하는 것
    const [file, setFile] = useState<File | null>(null);    // 파일 저장하는 건데 File이나 Null 상태임
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {   // textarea에서 일어나는 이벤트
        setTweet(e.target.value);   // value의 값을 setTweet으로 변경?
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target; // input 파일을 추출하는데, 파일이 딱 하나만 있는지 확인
        if (files && files.length === 1) {
            setFile(files[0]);  // 파일의 first child를 file의 값으로 저장, 타입이 file인 input 값이 변경시 파일의 배열을 받게 됨.
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;  // 현재 유저를 리턴해 addDoc에서 사용
        if (!user || isLoading || tweet === "" || tweet.length > 180) return;  // 로딩중, 트윗 빈칸, 트윗 글자수 초과시 멈춤
        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "tweets"), {    // 특정 컬렉션에 새로운 문서를 추가할 수 있다.
                tweet,  // 레퍼런스
                createAdt: Date.now(),  // 트윗이 언제 생성 되었는지 알 수 있다.
                username: user.displayName || "Anonymous", // 유저명
                userID: user.uid,   // 트윗 삭제할 권한을 확인하기 위해 유저 아이디도 저장
            });   // 새로운 document를 생성
            if (file) { // 이미지를 저장되면 다음과 같은 경로에 저장되게 된다
                const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${doc.id}`);
                await uploadBytes(locationRef, file);
            }
        } catch (e) {
            console.log(e);
        } finally { setLoading(false); }
    }
    return (
        <TweetForm onSubmit={onSubmit}>
            <TweetTextArea
                required
                rows={5}    // textarea 영역 중 보이는 라인 수를 결정
                maxLength={180} // input에 명시할 수 있는 최대 글자수
                onChange={onChange}
                value={tweet}
                placeholder="What is happening?!"
            />
            <TweetAttachFileButton htmlFor="file">
                {file ? "Photo added ✅" : "Add photo"}
            </TweetAttachFileButton>
            <TweetAttachFileInput
                onChange={onFileChange}
                type="file"
                id="file"
                accept="image/*"    // 모든 이미지를 허용함.
            />
            <TweetSubmitBtn
                type="submit"
                value={isLoading ? "Posting..." : "Post Tweet"}
            />
        </TweetForm>
    );
}
