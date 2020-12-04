# kakao map api
- redis store 사용 ( value를 string 단일로 사용.. >> 둘이상이 접근시 버그발생zz) 


### Features
- identification with cookie (react-cookie)
- Search Place using Kakao MAP API
- ADD/REMOVE places using axios / AWS lambda 

### 수정?
- DB가 너무 느리다 : redis 서버 리전 옮기거나 DB 새로 짜기
- 서버코드에 cors..
- 검색 기준 필요
- 에러 핸들링
- 컴포넌트 재활용 필요