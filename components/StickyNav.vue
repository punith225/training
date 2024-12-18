<template>
    <NavbarStickyAtlas
    :nav-items="{
      section_overview: 'Overview',
      section_accreditation: 'Accreditation',
      section_degrees: 'Degrees'
    }"
    :title="'On this page:'"
    :always-show-sticky-slot="true"
  >
      <template #stuckMenu>
        <div class="float-right">
          <div class="text-end">
            <a
              class="btn btn-secondary"
              href="#section_rfi"
              >Request info</a
            >
          </div>
        </div>
      </template>
    </NavbarStickyAtlas>
</template>