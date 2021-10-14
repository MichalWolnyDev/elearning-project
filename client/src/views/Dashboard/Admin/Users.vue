<template>
    <div>
       <v-container
         class="spacing-playground pa-6"
    fluid
       >
       <v-row class="mb-10">
            <v-btn
            color="success"
            elevation="3"
            >
            Dodaj użytkownika
            </v-btn>
       </v-row>
         <v-row>
            <v-card v-for="(user, id) in users" :key="id" class="d-flex justify-space-between align-center pa-6 mb-6" width="100%">
                <div>
                    <span>
                        {{ user.name }} {{ user.surname }}
                    </span>
                </div>
                <div class="d-flex">
                    <v-btn
                    elevation="2"
                    icon
                    class="mr-4"
                    ></v-btn>
                    <v-btn
                    elevation="2"
                    icon
                    >
                    <v-icon v-text="'mdi-delete'"></v-icon>
                    </v-btn>
                </div>
            </v-card>
        </v-row>
       </v-container>
    </div>
</template>

<script>
export default {
    name: 'users',
    data: () => ({
        users: [
            {
                name: 'michal',
                surname: 'wolny'
            },
            {
                name: 'jan',
                surname: 'nowak'
            },
        ]
    })
}
</script>