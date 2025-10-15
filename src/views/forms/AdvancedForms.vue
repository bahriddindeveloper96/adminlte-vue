<template>
  <div class="content-wrapper">
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Advanced Form Elements</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active">Advanced Forms</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6">
            <div class="card card-primary">
              <div class="card-header">
                <h3 class="card-title">Custom Select</h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label>Minimal</label>
                  <select class="custom-select">
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>California</option>
                    <option>Delaware</option>
                    <option>Tennessee</option>
                    <option>Texas</option>
                    <option>Washington</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Multiple</label>
                  <select multiple class="custom-select">
                    <option>Alabama</option>
                    <option>Alaska</option>
                    <option>California</option>
                    <option>Delaware</option>
                    <option>Tennessee</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="card card-info">
              <div class="card-header">
                <h3 class="card-title">Custom Range</h3>
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label>Custom range</label>
                  <input type="range" class="custom-range" min="0" max="5">
                </div>
                <div class="form-group">
                  <label>Custom range (custom-range-danger)</label>
                  <input type="range" class="custom-range custom-range-danger" min="0" max="10">
                </div>
                <div class="form-group">
                  <label>Custom range (custom-range-teal)</label>
                  <input type="range" class="custom-range custom-range-teal" min="0" max="10">
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card card-success">
              <div class="card-header">
                <h3 class="card-title">Custom Switches</h3>
              </div>
              <div class="card-body">
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1">
                  <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
                </div>
                <div class="custom-control custom-switch mt-2">
                  <input type="checkbox" class="custom-control-input" disabled id="customSwitch2">
                  <label class="custom-control-label" for="customSwitch2">Disabled switch element</label>
                </div>
                <div class="custom-control custom-switch custom-switch-off-danger custom-switch-on-success mt-2">
                  <input type="checkbox" class="custom-control-input" id="customSwitch3">
                  <label class="custom-control-label" for="customSwitch3">Toggle with custom colors (danger/success)</label>
                </div>
              </div>
            </div>

            <div class="card card-warning">
              <div class="card-header">
                <h3 class="card-title">Custom Radio & Checkbox</h3>
              </div>
              <div class="card-body">
                <div class="custom-control custom-radio">
                  <input class="custom-control-input" type="radio" id="customRadio1" name="customRadio">
                  <label for="customRadio1" class="custom-control-label">Custom Radio</label>
                </div>
                <div class="custom-control custom-radio">
                  <input class="custom-control-input" type="radio" id="customRadio2" name="customRadio">
                  <label for="customRadio2" class="custom-control-label">Custom Radio</label>
                </div>
                <div class="custom-control custom-radio">
                  <input class="custom-control-input" type="radio" id="customRadio3" name="customRadio" disabled>
                  <label for="customRadio3" class="custom-control-label">Custom Radio disabled</label>
                </div>
                <div class="custom-control custom-checkbox mt-3">
                  <input class="custom-control-input" type="checkbox" id="customCheckbox1" value="option1">
                  <label for="customCheckbox1" class="custom-control-label">Custom Checkbox</label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input class="custom-control-input" type="checkbox" id="customCheckbox2" checked>
                  <label for="customCheckbox2" class="custom-control-label">Custom Checkbox checked</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Advanced Forms component
</script>
