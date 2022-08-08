const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      userPosition: {
        latitude: undefined,
        longitude: undefined,
      },
      caimaneras: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      subscribe: async (caimaneraId) => {
        const token = localStorage.getItem("jwt-token");
        const resp = await fetch(
          `${process.env.BACKEND_URL}/api/subscribe/${caimaneraId}`,
          {
            method: "POST",
            body: {},
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (resp.status !== 201) return false;
        else return true;
      },
      getUserPosition: () => {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            setStore({
              userPosition: {
                latitude: lat,
                longitude: long,
              },
            });
          },
          function (error) {
            console.log("error", error);
          }
        );
      },
      getCaimaneras: async () => {
        try {
          const response = await fetch(
            `${process.env.BACKEND_URL}/api/caimaneras`
          );
          const body = await response.json();
          if (response.status !== 200) {
            alert("No cargaron las canchas");
            return true;
          }
          //        const caimanera_list = [];
          //        for (let caimanera in body) {
          //          caimanera_list.push(caimanera)
          //        }
          setStore({
            caimaneras: body,
          });
        } catch (error) {
          console.log(error);
        }
      },

      signUp: async (requestBody) => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.status === 201;
      },

      login: async (requestBody) => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/token`, {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw Error("Hubo un problema con el login");
        if (response.status === 401) {
          throw "password o usuario incorrecto";
        } else if (response.status === 400) {
          throw "revise el payload de su solicitud...";
        }
        const data = await response.json();
        localStorage.setItem("jwt-token", data.token);
        return true;
      },

      caimanera: async (requestBody) => {
        const token = localStorage.getItem("jwt-token");
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/caimaneras`,
          {
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.status === 401) {
          throw new Error("Chequee sus datos");
        } else if (response.status === 400) {
          throw new Error("revise el payload de su solicitud...");
        }
        return true;
        // en caso de que sea necesario el single, se hace return de caimanera id
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
