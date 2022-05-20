<template>
<div>
    <button v-if="!currentAccount || currentAccount ==''" @click="Connect" type="button" class="btn btn-info">Connect</button>
    <button v-else @click="Disconnect" type="button" class="btn btn-info">Disconnect</button>
</div>
</template>

<script lang="ts">
import { defineComponent, handleError } from '@vue/runtime-core';
import {ConnectInfo} from '@/interfaces/connectMetaMask';

export default defineComponent({
  name: 'MetaMask',
  data() {
    return {
      ethereum:null,
      connectInfo: {} as ConnectInfo,
      currentAccount:''
    }
  },
  methods: {
    async Connect() {
        if (typeof window.ethereum != 'undefined') {
            console.log('Connecting...');
            await window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(this.handleAccountsChanged)
            .catch((err:any) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    console.log('Please connect to MetaMask.');
                } else {
                    console.error(err);
                }
            });
        }

    },
    handleAccountsChanged(accounts:any[]) {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== this.currentAccount) {
            this.currentAccount = accounts[0];
            console.log('this.currentAccount',this.currentAccount);
            // Do any other work!
        }
    },
    async Disconnect(){
        const {ethereum}= window;
        await ethereum.request({
            method: "wallet_requestPermissions",
            params: [{
                eth_accounts: {}
            }]
        }).then(() => ethereum.request({
            method: 'eth_requestAccounts'
        }))
    },

  },
  async mounted() {
    const { ethereum } = window
    if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
    }else{
        this.Connect();
    }
    
  }
})

</script>