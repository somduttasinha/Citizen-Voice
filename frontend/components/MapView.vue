<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <div style="height:600px; width:100%">
                <l-map :useGlobalLeaflet="false" ref="mapRefWithoutControls" :zoom="mapViewData.options.zoom"
                    :center="mapViewData.options.center" @ready="onLeafletReadyMapWithoutControls"
                    :options="{ zoomControl: false }">
                    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                    <l-geo-json :geojson="mapViewData.geojson" :options="mapViewData.options"></l-geo-json>
                </l-map>
            </div>
            <v-btn class="mt-4" variant="tonal" append-icon="mdi-pencil" border v-bind="props">Edit Map</v-btn>
        </template>

        <v-card>
            <v-card-text>
                <v-text-field v-model="title" label="Name of map view" variant="outlined"></v-text-field>
                <div style="height:600px; width:800px">
                    <l-map renderMe ref="mapRef" :zoom="mapViewData.options.zoom" :center="mapViewData.options.center"
                        @ready="onLeafletReady" @update:zoom="updateZoom" @update:center="updateCenter">
                        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                        <l-feature-group ref="featureGroupRef" @ready="onFeatureGroupReady"></l-feature-group>
                    </l-map>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-btn variant="tonal" block @click="submitMap">Save map</v-btn>
                <!-- <v-btn color="primary" block @click="dialog = false">Save</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
  
<script setup>
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import { LMap, LTileLayer, LFeatureGroup, LGeoJson } from "@vue-leaflet/vue-leaflet";
import "leaflet-draw/dist/leaflet.draw-src.js";
import "leaflet-toolbar";
import "leaflet-draw-toolbar/dist/leaflet.draw-toolbar.js";
import { ref, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
// Store
import { useMapViewStore } from "~/stores/mapview"
import { useQuestionDesignStore } from "~/stores/questionDesign"

const mapViewStore = useMapViewStore()
const questionStore = useQuestionDesignStore()

const props = defineProps({
    questionIndex: Number,
    mapViewId: Number | undefined
})

const mapRef = ref(null)
const featureGroupRef = ref(null)
const featureGroupRefStatic = ref(null)
const dialog = ref(props.dialogOpen)
const drawnItemsRef = ref(null)
const optionsTempStore = ref({
    zoom: null,
    center: null
})
const mapViewData = ref({
    id: props.mapViewId || null,
    name: props.title || "",
    map_service_url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
        zoom: 7,
        center: [
            52.456009,
            5.251465
        ]
    },
    geojson: {
        type: "FeatureCollection",
        features: []
    }
})

// this is used to update the component value after changes
// const renderMe = ref(0)

const title = computed({
    get: () => props.title || mapViewData.value.name,
    set: (value) => {
        mapViewData.value.name = value
    }
})


onBeforeMount(async () => {
    if (props.mapViewId) {
        console.log('props.mapViewId //> ', props.mapViewId)
        const geoData = await mapViewStore.fetchMapView(props.mapViewId)
        console.log('geoData //> ', geoData)

        mapViewData.value = { ...mapViewData.value, ...geoData }
    }
})

/**
 * Add the props.geojson to the drawnItemsRef value
 */

const onLeafletReady = () => {
    const map = mapRef.value.leafletObject;
    drawnItemsRef.value = featureGroupRef.value.leafletObject;

    if (mapViewData.value.geojson.features) {
        const drawnItems = drawnItemsRef.value;
        const initialGeojson = mapViewData.value.geojson;

        initialGeojson.features.forEach((feature) => {
            const layer = L.geoJSON(feature);
            drawnItems.addLayer(layer);
        });
    }

    // Initialize the draw control and pass it the FeatureGroup of editable layers
    const drawControl = new L.Control.Draw({
        edit: {
            featureGroup: drawnItemsRef.value,
        },
    });

    map.addControl(drawControl);

    // Add draw event listeners
    map.on(L.Draw.Event.CREATED, (event) => {
        const layer = event.layer;
        drawnItemsRef.value.addLayer(layer);
    });

    map.on(L.Draw.Event.DELETED, (event) => {
        const layers = event.layers;
        layers.eachLayer((layer) => {
            drawnItemsRef.value.removeLayer(layer);
        });
    });

    map.on(L.Draw.Event.EDITED, (event) => {
        const layers = event.layers;
        layers.eachLayer((layer) => {
            // Remove the old version of the edited layer
            drawnItemsRef.value.removeLayer(layer);

            // Add the updated version of the edited layer
            drawnItemsRef.value.addLayer(layer);
        });
    });

    // Add zoomend event listener
    map.on('zoomend', () => {
        mapViewData.value.zoom = map.getZoom();
    });

    // Add moveend event listener
    map.on('moveend', () => {
        const { lat, lng } = map.getCenter()
        mapViewData.value.center = [lat, lng]
    });

};

// Map without controls
const mapRefWithoutControls = ref(null)


const onLeafletReadyMapWithoutControls = () => {
    const map = mapRefWithoutControls.value.leafletObject;
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();
    // document.getElementById('map').style.cursor = 'default';
};

/**
 * Handlers
 */

const updateZoom = (value) => {
    console.log('value //> ', value)
    optionsTempStore.zoom = value
}

const updateCenter = (value) => {
    console.log('value //> ', value)
    optionsTempStore.center = value
}

const submitMap = async () => {
    let response
    mapViewData.value.geojson = drawnItemsRef.value.toGeoJSON()
    // Save new zoom value if not falsely
    if (optionsTempStore?.value?.zoom) {
        mapViewData.value.options.zoom = optionsTempStore.value.zoom
    }
    // Save new center value if not falsely
    if (optionsTempStore?.value?.center?.lat) {
        mapViewData.value.options.center = [optionsTempStore.value.center.lat, optionsTempStore.value.center.lng]
    }
    /**
     * Check if the mapview already exists, if it exist then update, if not then create a new one
     */

    if (props.mapViewId) {
        response = await mapViewStore.updateMapview(props.mapViewId, mapViewData.value)
    } else {
        mapViewData.value.name = mapViewData?.value?.name || uuidv4()
        response = await mapViewStore.createMapview(mapViewData?.value)
    }

    if (response.data) {
        mapViewData.value.name = response.data.name
        await questionStore.editCurrentQuestionKeyValue(props.questionIndex, { map_view: response.data.id })
        await questionStore.saveCurrentQuestions()
    }
    response.refresh()
}
</script>
  
<style></style>