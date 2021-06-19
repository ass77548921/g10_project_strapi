

 'use strict';

 const fetch = require("node-fetch");
 
 module.exports = {
  homePage: async (ctx) => {
    try{
      const response = await fetch("https://g10-project-strapi.herokuapp.com/cases");
      const data = await response.json();
      return await ctx.render("html/list/case",{
        data
      });
    } catch(err){
      console.log("Errors on getting case!");
    }
  },
   crudPage: async (ctx) => {
     try {
       const response = await fetch("https://g10-project-strapi.herokuapp.com/cases");
       const data = await response.json();
       //console.log("crudPage", data);
       return await ctx.render("crud_case/index", { data });
     } catch (err) {
       console.log("Errors on getting books!");
       return await ctx.render("crud_case/index", { data: "" });
     }
   },
   crud_addPage: async(ctx) => {
       
       return await ctx.render("crud_case/add", {
         name: "",
        
         size: "",
         image_url: "",
       
         
       });
   },
   crud_add: async(ctx) => {
     const name = ctx.request.body.name;
  
     const size = ctx.request.body.size;
     const image_url = ctx.request.body.image_url;
     
     
     //console.log(name, cpu_type, size, image_url, type);
 
     const form_data = {
       name,
       
       size, 
       image_url, 
     
      
     };
 
     try {
       // await db.query("INSERT INTO books SET ?", form_data);
       const response = await fetch("https://g10-project-strapi.herokuapp.com/cases", {
         method: "post",
         body: JSON.stringify(form_data), 
         headers: { "Content-Type": "application/json" },
       });
       const data = await response.json();
       return await ctx.redirect("/crud_case");
     } catch (err) {
       console.log(err);
       return await ctx.render("crud_case/add", {
         name: form_data.name,
   
         size: form_data.size,
         image_url: form_data.image_url,
        
         
       });
     }
   },
   crud_editPage: async(ctx) => {
     const id = ctx.params.id;
     try {
       // const [rows] = await db.query("SELECT * FROM books WHERE id = ?", [id]);
       const response = await fetch(`https://g10-project-strapi.herokuapp.com/cases/${id}`);
       const data = await response.json();
       return await ctx.render("crud_case/edit", {
        id:data.id,
        name: data.name,
         
         size: data.size,
         image_url: data.image_url,
         
       });
     } catch (err) {
       console.log(err);
     }
   },
   crud_update: async(ctx) => {
     const id = ctx.request.body.id;
     const name = ctx.request.body.name;
     
     const size = ctx.request.body.size;
     const image_url = ctx.request.body.image_url;
    
 
     //console.log(name, cpu_type, size, image_url, type,id);
   
     const form_data = {
         name,
       
         size, 
         image_url, 
     
        
       };
     try {
       const response = await fetch(`https://g10-project-strapi.herokuapp.com/cases/${id}`, {
         method: "put",
         body: JSON.stringify(form_data), 
         headers: { "Content-Type": "application/json" },
       });
       const data = await response.json();
       return await ctx.redirect("/crud_case");
     } catch (err) {
       console.log(err);
     }
   },
   crud_delete: async(ctx) => {
     let id = ctx.params.id;
 
   try {
     // await db.query("DELETE FROM books WHERE id = ?", [id]);
     const response = await fetch(`https://g10-project-strapi.herokuapp.com/cases/${id}`, {
       method: "delete",
     });
     const data = await response.json();
   } catch (err) {
     console.log(err);
   }
   return await ctx.redirect("/crud_case");
   },

   final:async(ctx)=>{
     const cid= ctx.params.cid;
     const mid= ctx.params.mid;
     const rid= ctx.params.rid;
     const caid= ctx.params.caid;
     const response = await fetch(`https://g10-project-strapi.herokuapp.com/cpus/${cid}`);
     const cdata= await response.json();;
     const response2 = await fetch(`https://g10-project-strapi.herokuapp.com/motherboards/${mid}`);
     const mdata= await response2.json();;
     const response3 = await fetch(`https://g10-project-strapi.herokuapp.com/rams/${rid}`);
     const rdata= await response3.json();;
     const response4= await fetch(`https://g10-project-strapi.herokuapp.com/cases/${caid}`);
     const cadata= await response4.json();;

     console.log(cadata);

     return await ctx.render("html/selection_list",{
      cdata,mdata,rdata,cadata
  });

   }

 };
 
