import * as SecureStore from 'expo-secure-store';
const BASE='https://api.github.com';
export type GHRepo={id:number;name:string;full_name:string;owner:{login:string};default_branch:string;private:boolean;description:string|null;language:string|null;stargazers_count:number;html_url:string};
export async function saveGithubToken(token:string){await SecureStore.setItemAsync('github_pat',token);}
export async function getGithubToken(){return SecureStore.getItemAsync('github_pat');}
export async function clearGithubToken(){await SecureStore.deleteItemAsync('github_pat');}
async function request(path:string,method='GET',body?:any){
 const token=await getGithubToken(); if(!token) throw new Error('Pehle GitHub token connect karein.');
 const response=await fetch(BASE+path,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{})},body:body?JSON.stringify(body):undefined});
 const data=await response.json().catch(()=>({})); if(!response.ok) throw new Error(data.message||`GitHub API error ${response.status}`); return data;
}
const enc=(s:string)=>encodeURIComponent(s);
export async function getRepos():Promise<GHRepo[]>{return request('/user/repos?per_page=100&sort=updated&affiliation=owner,collaborator,organization');}
export async function createRepo(name:string,isPrivate:boolean,description=''){return request('/user/repos','POST',{name,private:isPrivate,description,auto_init:true});}
export async function getBranches(owner:string,repo:string){return request(`/repos/${enc(owner)}/${enc(repo)}/branches?per_page=100`);}
export async function getTree(owner:string,repo:string,branch:string){const b=await request(`/repos/${enc(owner)}/${enc(repo)}/branches/${enc(branch)}`);return request(`/repos/${enc(owner)}/${enc(repo)}/git/trees/${b.commit.sha}?recursive=1`);}
export async function getFile(owner:string,repo:string,path:string,branch:string){return request(`/repos/${enc(owner)}/${enc(repo)}/contents/${path.split('/').map(enc).join('/')}?ref=${enc(branch)}`);}
export async function putFile(owner:string,repo:string,path:string,contentBase64:string,message:string,branch:string,sha?:string){return request(`/repos/${enc(owner)}/${enc(repo)}/contents/${path.split('/').map(enc).join('/')}`,'PUT',{message,content:contentBase64,branch,...(sha?{sha}:{})});}
export async function deleteFile(owner:string,repo:string,path:string,sha:string,message:string,branch:string){return request(`/repos/${enc(owner)}/${enc(repo)}/contents/${path.split('/').map(enc).join('/')}`,'DELETE',{message,sha,branch});}
export async function createBranch(owner:string,repo:string,newBranch:string,fromBranch:string){const base=await request(`/repos/${enc(owner)}/${enc(repo)}/git/ref/heads/${enc(fromBranch)}`);return request(`/repos/${enc(owner)}/${enc(repo)}/git/refs`,'POST',{ref:`refs/heads/${newBranch}`,sha:base.object.sha});}
export async function listCommits(owner:string,repo:string,branch:string){return request(`/repos/${enc(owner)}/${enc(repo)}/commits?sha=${enc(branch)}&per_page=20`);}
export async function listIssues(owner:string,repo:string){return request(`/repos/${enc(owner)}/${enc(repo)}/issues?state=open&per_page=30`);}
export async function createIssue(owner:string,repo:string,title:string,body:string){return request(`/repos/${enc(owner)}/${enc(repo)}/issues`,'POST',{title,body});}
export async function listPulls(owner:string,repo:string){return request(`/repos/${enc(owner)}/${enc(repo)}/pulls?state=open&per_page=30`);}
export async function createPull(owner:string,repo:string,title:string,head:string,base:string,body:string){return request(`/repos/${enc(owner)}/${enc(repo)}/pulls`,'POST',{title,head,base,body});}
