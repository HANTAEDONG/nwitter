// 트윗창

import { useState } from "react";
import styled from "styled-components"

// 트윗 창의 form
const TweetForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

// 트윗 창 testarea
const TweetTextArea = styled.textarea`
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

const TweetAttachFileButton = styled.label`
     padding: 10px 0px;
     color: #1d9bf0;
     text-align: center;
     border-radius: 20px;
     border:1px solid #1d9bf0;
     font-size:14px;
     font-weight: 600;
     cursor: pointer;
`;

const TweetAttachFileInput = styled.input`
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

const TweetSubmitBtn = styled.input`
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
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    };
    return (
        <TweetForm>
            // 유저가 트윗하기 위한 텍트 area
            <TweetTextArea
                rows={5}
                maxLength={180}
                onChange={onChange}
                value={tweet}
                placeholder="What is happening?!"
            />
            // 유저가 사진 업로드 하기 위해 폴더에 접근하기 위한 버튼
            <TweetAttachFileButton htmlFor="file">
                {file ? "Photo added ✅" : "Add photo"}
            </TweetAttachFileButton>
            <TweetAttachFileInput
                onChange={onFileChange}
                type="file"
                id="file"
                accept="image/*"    // 모든 이미지를 허용함.
            />
            // 서브밋 하기 위한 버튼
            <TweetSubmitBtn
                type="submit"
                value={isLoading ? "Posting..." : "Post Tweet"}
            />
        </TweetForm>
    );
}
