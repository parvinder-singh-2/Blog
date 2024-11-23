import conf from '../conf/conf.js'
import {Client, Account, ID } from "appwrite"


export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    } 
    //create account feture
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call login method
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log('Appwrite service :: createAccount :: error', error)
        }
    }

    // login method
    async login({email, password}) {
        try {
            await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log('Appwrite service :: login :: error', error)
        }
    }


    // getting current user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log('Appwrite service :: getCurrentUser :: error', error);
        }

        return null;
    }

    //logout
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Apperite service :: logout :: error" , error );
            
        }
    }




}


const authservice = new AuthService();

export default authservice;