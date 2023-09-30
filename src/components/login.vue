<script setup>
import { authData } from '../data/data';
import { useRoute } from 'vue-router';
import router from '../router/router'
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { useToast } from "vue-toast-notification";
const auth = authData();
const userData = reactive({
    username: "",
    password: ""
});
const toast = useToast();

const rules = {
    username: { required }, // Matches state.firstName
    password: { required }, // Matches state.lastName
}

const validate = useVuelidate(rules, userData);

function login(val) {
    const result = validate.value.$validate();

    if (val.username.$error || val.password.$error) {
        if (val.username.$error && val.password.$error) {
            toast.error("Username and Password field is empty ");
        } else if (val.username.$error) {
            toast.error("Username field is empty ");
        } else if (val.password.$error) {

            toast.error("Password field is empty ");
        }


    } else {

        auth.authenticate(userData.username, userData.password);
    }

}

</script>

<template>
    <!-- component -->
    <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
            <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                <p>Username: kminchelle</p>
                <p>Password: 0lelplR</p>
                <div class="px-5 py-7">
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input v-model="validate.username.$model" type="text"
                        class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input v-model="validate.password.$model" type="password"
                        class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
                    <button type="button" @click="login(validate)"
                        class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                        <span class="inline-block mr-2">Login</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            class="w-4 h-4 inline-block">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>


            </div>
            <div class="py-5">
                <div class="grid grid-cols-2 gap-1">
                    <div class="text-center sm:text-left whitespace-nowrap">
                        <button
                            class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                class="w-4 h-4 inline-block align-text-top">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>