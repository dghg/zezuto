# kakao map api
- redis store 사용 ( value를 string 단일로 사용.. >> 둘이상이 접근시 버그발생zz) 


### Features
- identification with cookie (react-cookie)
- Search Place using Kakao MAP API
- ADD/REMOVE places using axios / AWS lambda 

### 수정?
- DB가 너무 느리다 : aws 리전 버지니아에 있었음 (옮김 : 1.18s -> 225ms) DB 새로 짜기
- 서버코드에 cors..
- 검색 기준 필요
- 에러 핸들링
- 컴포넌트 재활용 필요
- TS 버전 내리기