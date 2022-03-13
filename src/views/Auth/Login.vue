<template>
  <div>
    <v-container fluid class="content">
    <v-row class="justify-center">
      <v-row
        class="hh"
        align="center"
        justify="center" 
        no-gutters
        dense>
             <v-col
                class="d-md-none d-lg-flex"
                height="400"
                cols="6"
                sm="12"
                md="6"
                lg="3"
                xl="3"
              >
                <v-card
                  class="rounded-l-lg"
                  style=""
                  elevation="3"
                  color="white"
                  height="400"
                  tile
                >
                  <v-img src="../../assets/img/lmis-logo.png" class="mt-4">
                  </v-img>
                </v-card>
              </v-col>
      <v-col
        cols="6"
        sm="12"
        md="6"
        lg="3"
        xl="3"
      >
        <v-card
          class="rounded-r-lg d-md-rounded-lg"
          elevation="0"
          height="400"
          outlined
          tile
        >
           <v-card-title class="justify-center pa-4">
                      <h2>Welcome</h2>
                      </v-card-title>
                      <v-form ref="Formref">
                    <v-row class="mx-5 pt-12">
                        <v-col
                            cols="12"
                            class="pa-0 px-4"
                            >
                            <v-text-field
                              color="blue"
                                class="font-size-14"
                                v-model="email"
                                :rules="[formRules.required, formRules.email]"
                                label="Email address"
                                required
                                dense
                            ></v-text-field>
                        </v-col>
                        <v-col
                            cols="12"
                            class="pa-0 px-4 mt-2"
                            >
                            <v-text-field
                                color="blue"
                                class="font-size-14"
                                dense
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[formRules.required]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            <div class="font-size-14 text-end">
                                <button class="blue--text">Forgot Password?</button>
                            </div>
                        </v-col>
                        <v-col
                            cols="12">
                            <div class="d-flex justify-center">
                                <v-btn
                                  depressed
                                  color="primary"
                                  class="white--text py-2 font-size-14"
                                  :loading="isLoading"
                                  @click="dologin()">Login</v-btn>
                            </div>
                        </v-col>
                        <v-col
                            cols="12">
                            <div class="d-flex justify-center pt-8 pb-3 font-size-14">
                                Don't have an account?
                                <router-link class="pl-2"  to ="/register">
                                  Register</router-link>
                            </div>
                        </v-col>
                    </v-row>
                      </v-form>
        </v-card>
      </v-col>
      </v-row>
    </v-row>
  </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    mounted () {
      if(this.$store.state.user){
      if(!this.$store.state.user.roleID){
        this.deleteToken();
        setTimeout(function(){  location.reload(); }, 5000);
      }
      }
    },
    methods: {
        dologin () {
          if(this.$refs.Formref.validate()){
            this.isLoading = true;
             let data = new FormData();
                data.append('email', this.email);
                data.append('password', this.password);
                  this.axiosCall(
                        '/login',
                        'POST',
                        data
                    )
                    .then((res) => {
                      this.isLoading = false;
                        if (res.data.status){
                        localStorage.setItem("token", res.data.data.data.user.token);
                        location.reload();
                        }
                        else{
                          if(res.data.message === 'otp'){
                            this.$router.replace({path: '/register/' + this.email});
                          }else{
                        this.fadeAwayMessage.show = true;
                        this.fadeAwayMessage.type = 'error';
                        this.fadeAwayMessage.message = res.data.message;
                        this.fadeAwayMessage.header = 'System Message';
                          }
                        }
                    })
            }
        }
    },
    data: () => ({
      isLoading: false,
      email: '',
      password: '',
      show1: false,
    }),
  }
</script>

<style scoped>
.back {
  /* background: url('../assets/thon.png')
    no-repeat center center fixed !important;
    background-color: rgb(49, 112, 49); */
  background-color: rgb(49, 112, 49);
  background-size: cover;
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.content {
    /* background: url('../assets/BG_3rd_Layer.png')
    no-repeat center center fixed !important; */
    background: url('../../assets/img/login-background.svg') no-repeat center fixed, linear-gradient(0deg, rgba(0,115,52,1) 0%, rgba(46,92,7,1) 100%);
    /* background: rgb(0,115,52);
    background: linear-gradient(90deg, rgba(0,115,52,1) 0%, rgba(108,125,11,1) 100%); */
    background-size: cover;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--ntp-one-google-bar-height));
    min-width: fit-content;
    position: relative;
    z-index: 1;
}
:host {
    --ntp-theme-shortcut-background-color: rgb(229, 231, 232);
    --ntp-theme-text-color: var(--google-grey-800);
    --ntp-theme-text-shadow: none;
    --ntp-one-google-bar-height: 56px;
    --ntp-search-box-width: 337px;
}
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hh {
  height: 100vh;
}
</style>
