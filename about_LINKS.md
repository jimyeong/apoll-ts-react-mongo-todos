GraphQL을 공부하는 도중에, 한참동안, 미들웨어 설정을 어떻게 하는 지 찾았다.

내가 하고 싶었던 것은,
accessToken 이 없을 경우 어떻게 Client에게 Unauthorized 메시지를
전달할 것인가 하는 것이었다.

계속 미들웨어라는 키워드로 검색을 해서 그런지, 깔끔해 보이는 솔루션이 나오질 않았다.

```
app.use(
  "/graphql",
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => {
        ... verify the tokens.
        if(yes)...
        if(no)...
    },
  })
);
```

이게 내가 찾은 솔루션이었는데,
너무 별로 였다.
미심쩍은 느낌이 가시질 않는 느낌,

들어오는 요청중, 회원과 비회원 구분을 하고 싶으면?
더 나아가서, 더 많은 케이스를 만들고 싶으면?
진짜? 이게 방법이라고?

근데 아무리 찾아도 방법을 찾을 수가 없었다.
아마도 내가 middleware라는 키워드를 사용하고 있어서 그랬던 것 같다.

2주동안, 정체가 이어졌다.
정체가 이어질 수록, 꾸역꾸역하는 마음으로 하게 되었고, 일하고 오면 피곤하다는 핑계로 몰입해서 하지 않고, 산만하게, 꾸역꾸역했다.

그러다가, 일단 찾아낸 솔루션을 넣고 나중에, 필요하면 바꿔야지 하고 있었는데,

Socket 통신을 찾는 도중에,
이미 GraphQL문서에, 이러한 상황을 다루는 효과적인 API 들이 있음을 알게되었다.

## Links

최종 endPoint까지 가기 전에, 중간단계에서 필요한 Logic이 실행되는 Middleware 처럼, GraphQL에는 endPoint까지 가기전에, Link라는 것이 있어서, 이것이 중간단계에서 필요한 logic을 수행한다.

용어는 Link라고 명명이 되어있지만,
나에게는 사실상 Middleware 컨셉과 크게 다르지 않아보인다.

각종 Error처리도 Link에서 한다.
React Component 안에서도
최종적으로 Error처리를 할 수 있지만,

```
example)

[{data,ERROR,loading}]=useQuery(...)
```

기본적으로는, Link안에서 우선적으로 다루는 것 같다.

결과적으로 request를 하고 있는 React Component가 서버 response를 받기 전에, Link단에서 한번 더 정교한 logic를 수행할 수 있는 장을 마련해주고 있는 셈이다.

꽤 확장성이 있어보이는 게,
Additive Compotision
Directional Composition

구성이라고 해서,
Middleware지만, 분기(?) 를 지원하는 것 같다. (일률적인 pipeline을 따르는 게 아니라, 다른 Middleware로 보낼 수 있는 듯)

또한,
Operation 이라고 해서,
User가 어떤 요청을 했는지, 그것에 대한 정보가 객체로 전달이 되고, 그 객체를 가공하거나, 요청을 거절하거나 등의 작업을 처리할 수 있다.

![img: pictureofLi]
Link는 사진에서 보는 것처럼 Terminating Link과 일반 Link로 구성이 되는데,
express에서 다음 middleware로 보내기 위해서 next()함수를 썼다면, GraphQL에선,

다음 Link로 보내기 위해서 forward() 라는 함수를 사용한다.

GraphQL server(EndPoint) 가기 직전 마지막 Link는 Terminating Link라고 불리는데, forward를 호출하지 않는다.

공식문서에서는 Terminating Link를 설명하면서 HttpLink를 설명하는데,

HttpLink는 순서적으로 제일 마지막에 와야하는 것 같다.

-

Reference : https://www.apollographql.com/docs/react/api/link/introduction/

#AccessToken #RefreshToken #errorHandling #Socket #GraphQL
