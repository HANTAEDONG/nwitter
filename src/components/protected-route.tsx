import { Navigate } from "react-router-dom";
import { auth } from "../firebase";


// 프로파일과 홈페이지는 모두 ProtectedRoute의 children으로 보내짐.
// 유저가 로그인했나 확인후 안했으면 로그인으로 보냄
export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = auth.currentUser;      // 파이어베이스가 유저가 로그인 했는지 안했나 반환
    if (user === null) {
        return <Navigate to="/login" />;    // 로그인 안했으면 로그인으로 이동
    }
    return children;        // Home or Profile을 반환
}
