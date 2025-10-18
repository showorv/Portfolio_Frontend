
"use server" 

export const getSkill = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skill`, {
        cache: "no-store"
      })

      const result = await res.json()

      return result
}

export const deleteSkill = async (id: string)=>{

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/skill/${id}`, {
       method: "DELETE",
       credentials: "include"
      })

      if(!res.ok){
        const errorText = await res.text();
        console.error("Error in delete skill:", errorText);
      }



      const result = await res.json()


      return result

}


