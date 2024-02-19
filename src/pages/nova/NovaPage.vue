<template>
  <q-page
    padding
    class="flex flex-center"
  >
    <q-table
      :rows="data"
      :columns="columns"
      ref_key="id"
    >
      <!-- Pesonalizando o header -->
      <template #header-cell="props">
        <q-th
          class="bg-grey-2 text-grey-8 text-bold"
          :props="props"
        >
          {{ props.col.label }}
        </q-th>
      </template>
      <!-- Pesonalizando a coluna user -->

      <template #body-cell-user="props">
        <q-td :props="props">
          <q-item>
            <q-item-section side>
              <q-img
                width="48px"
                :src="props.row.imgSrc"
              ></q-img>
            </q-item-section>
            <q-item-section>
              <q-item-label
                style="font-size: 1.3em;"
                class="text-weight-bold text-grey-7"
              >
                {{ props.row.user }} #{{ props.row.id }}
              </q-item-label>
              <q-item-label
                style="font-size: 0.8em;"
                class="text-weight-bold text-grey-5"
              >
                {{ props.row.email }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-td>
      </template>
      <!-- Pesonalizando a coluna status -->

      <template #body-cell-status="props">
        <q-td :props="props">
          <q-chip
            :label="props.row.status.label"
            :color="props.row.status.bgColor"
            :text-color="props.row.status.txColor"
          ></q-chip>
        </q-td>
      </template>
      <!-- Pesonalizando a coluna actions -->
      <!-- https://fonts.google.com/icons search dots -->

      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="more_vert"
            round
            flat
            color="blue-8"
          >
            <q-menu auto-close>
              <q-list>
                <q-item>
                  <q-item-section side>
                    <q-btn
                      icon="mdi-eye"
                      color="info"
                      size="sm"
                      dense
                      @click="handleView(props.row)"
                    >
                      <q-tooltip>Visualizar</q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      icon="mdi-pencil"
                      color="secondary"
                      size="sm"
                      dense
                      @click="handleEdit(props.row)"
                    >
                      <q-tooltip>Editar</q-tooltip>
                    </q-btn>
                  </q-item-section>
                  <q-item-section>
                    <q-btn
                      icon="mdi-delete"
                      color="negative"
                      size="sm"
                      dense
                      @click="handleDelete(props.row)"
                    >
                      <q-tooltip>Excluir</q-tooltip>
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
const statuses = {
  inProgress: {
    label: "In progress",
    bgColor: "blue-2",
    txColor: "blue"
  },
  notRegistered: {
    label: "Not registered",
    bgColor: "red-2",
    txColor: "red"
  }
};

const data = [
  {
    id: 1,
    user: "Raimundo",
    email: "raimundoferreira@gmail.com",
    imgSrc: "https://picsum.photos/100/100",
    status: statuses.inProgress
  },
  {
    id: 2,
    user: "Emanuelle",
    email: "emanuelleferreira@gmail.com",
    imgSrc: "https://picsum.photos/200/200",
    status: statuses.notRegistered
  }
]

const columns = [
  {
    field: "user",
    name: "user",
    label: "User",
    align: "center"
  },
  {
    field: "status",
    name: "status",
    label: "Status",
    align: "center"
  },
  {
    field: "actions",
    name: "actions",
    label: "Actions"
  },
];

function handleView(row) {
  console.log(row);
};

function handleEdit(row) {
  console.log(row);
};

function handleDelete(row) {
  console.log(row);
};
</script>
