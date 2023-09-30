import { defineStore } from "pinia";
import { ref, reactive, onBeforeMount } from "vue";
import axios from "axios";
import router from "../router/router";
import { useToast } from "vue-toast-notification";
const toast = useToast();
const authData = defineStore("authenticate", () => {
  const isauthenticate = ref(localStorage.getItem("auth") == 1);
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const authenticate = async (username, password) => {
    let url = "https://dummyjson.com/auth/login";
    let logindata = {
      username: username,
      password: password,
    };
    let response = await axios.post(url, logindata);
    if (response.status == 200) {
      localStorage.setItem("auth", 1);
      localStorage.setItem("user", JSON.stringify(response.data));
      isauthenticate.value = true;
      user.value = response.data;
      toast.success("Login Successful");
      router.push("/");
    } else {
      toast.error("Login unsucessfull");
    }
  };
  const logout = () => {
    localStorage.setItem("auth", 0);
    localStorage.setItem("user", "{}");
    isauthenticate.value = false;
    user.value = {};
    router.push("/login");
  };

  return { authenticate, isauthenticate, logout, user };
});

const todoData = defineStore("todoitem", () => {
  const todoItemList = ref();
  const gettodoitems = async () => {
    let url = "https://dummyjson.com/todos";
    let response = await axios.get(url);
    todoItemList.value = response.data;
  };

  const updateItems = async (task) => {
    let url = "https://dummyjson.com/todos/" + task.id;

    let res = await axios.put(url, { completed: task.completed });
    if (res.status == 200) {
      toast.success("todo list updated");
    }
  };

  return { todoItemList, gettodoitems, updateItems };
});

export { authData, todoData };
