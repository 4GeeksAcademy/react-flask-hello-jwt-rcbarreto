// flux.js
const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		token: localStorage.getItem("token") || null,
		user: null,
		error: "",
		loading: false,
	  },
	  actions: {
		// Función para registrar un usuario
		register: async (name, email, password) => {
		  const store = getStore();
		  setStore({ loading: true, error: "" });
  
		  // Validaciones
		  if (!name || !email || !password) {
			setStore({ error: "Todos los campos son obligatorios.", loading: false });
			return false;
		  }
  
		  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		  if (!emailRegex.test(email)) {
			setStore({ error: "Por favor ingrese un correo electrónico válido.", loading: false });
			return false;
		  }
  
		  if (password.length < 6) {
			setStore({ error: "La contraseña debe tener al menos 6 caracteres.", loading: false });
			return false;
		  }
  
		  try {
			const response = await fetch(`${process.env.BACKEND_URL}api/signup`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({ name, email, password }),
			});
  
			const data = await response.json();
  
			if (response.ok) {
			  alert("Usuario registrado con éxito.");
			  setStore({ loading: false });
			  return true;
			} else {
			  setStore({ error: data.msg || "Hubo un error al registrar el usuario.", loading: false });
			  return false;
			}
		  } catch (error) {
			console.error("Error al registrar el usuario:", error);
			setStore({ error: "Hubo un error al registrar el usuario.", loading: false });
			return false;
		  }
		},
	  },
	};
  };
  
  export default getState;
  