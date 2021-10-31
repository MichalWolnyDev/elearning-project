<template>
  <v-card
    class="mx-auto"
    height="100%"
    tile
  >
      <v-list>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Admin
            </v-list-item-title>
            <v-list-item-subtitle>admin@test.pl</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon>mdi-menu-down</v-icon>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.link"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text" ></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 0,
      items: [
        { text: 'Użytkownicy', icon: 'mdi-account-multiple', link: '/dashboard/admin/users'},
        { text: 'Quizy', icon: 'mdi-file-document', link: '/dashboard/admin/quiz' },
        { text: 'Students', icon: 'mdi-file-document', link: '/dashboard/students' },
      ],
    }),
  }
</script>