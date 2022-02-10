import agent from "agent";

const getUser = async (ctx)=> {
  try {
    const response = await agent.Auth.current({
      headers: {Cookie: ctx.req.headers.cookie}
    });
    
    if(response.user) 
      return response.user || null;
    
  }catch(error) {
    //ignore error
  }

  return null;
}

const required = ()=> async (ctx)=> {
  const user = await getUser(ctx);

  if(user)
    return {props: {user}};

  return {
    props: {}, 
    redirect: {destination: "/signIn"}
  };
}

const check = ()=> async (ctx)=> {
  const user = await getUser(ctx);

  if(!(user))
    return {props: {}};

  return {
    props: {}, 
    redirect: {destination: "/profile"}
  };
}

export default { required, check };