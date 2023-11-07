<template>
  <div style="height:100vh;width:100%">
    <indexBar :index="list" />
  </div>
</template>

<script>
import indexBar from './components/indexBar'
export default {
  name: 'App',
  data() {
    return {
      list: {
        A: [
          { phoneCode: 93, countryName: 'Afghanistan' },
          { phoneCode: 355, countryName: 'Albania' },
          { phoneCode: 213, countryName: 'Algeria' },
          { phoneCode: 1684, countryName: 'American Samoa' },
          { phoneCode: 376, countryName: 'Andorra' },
          { phoneCode: 244, countryName: 'Angola' },
          { phoneCode: 1264, countryName: 'Anguilla' },
          { phoneCode: 54, countryName: 'Argentina' },
          { phoneCode: 374, countryName: 'Armenia' },
          { phoneCode: 297, countryName: 'Aruba' },
          { phoneCode: 61, countryName: 'Australia' },
          { phoneCode: 43, countryName: 'Austria' },
          { phoneCode: 994, countryName: 'Azerbaijan' }
        ],
        B: [
          { phoneCode: 242, countryName: 'Bahamas' },
          { phoneCode: 973, countryName: 'Bahrain' },
          { phoneCode: 880, countryName: 'Bangladesh' },
          { phoneCode: 268, countryName: 'Barbados' },
          { phoneCode: 375, countryName: 'Belarus' },
          { phoneCode: 32, countryName: 'Belgium' },
          { phoneCode: 501, countryName: 'Belize' },
          { phoneCode: 229, countryName: 'Benin' },
          { phoneCode: 1809, countryName: 'Bermuda' },
          { phoneCode: 975, countryName: 'Bhutan', countryCode: 'BTN' },
          { phoneCode: 591, countryName: 'Bolivia', countryCode: 'BOL' },
          { phoneCode: 387, countryName: 'Bosnia and Herzegovina' },
          { phoneCode: 267, countryName: 'Botswana' },
          { phoneCode: 55, countryName: 'Brazil', countryCode: 'BRA' },
          { phoneCode: 1284, countryName: 'British Virgin Islands' },
          { phoneCode: 673, countryName: 'Brunei' },
          { phoneCode: 359, countryName: 'Bulgaria' },
          { phoneCode: 226, countryName: 'Burkina Faso' },
          { phoneCode: 257, countryName: 'Burundi' }
        ],
        C: [
          { phoneCode: 855, countryName: 'Cambodia' },
          { phoneCode: 237, countryName: 'Cameroon' },
          { phoneCode: 1, countryName: 'Canada' },
          { phoneCode: 238, countryName: 'Cape Verde' },
          { phoneCode: 345, countryName: 'Cayman Islands' },
          { phoneCode: 236, countryName: 'Central African Republic' },
          { phoneCode: 56, countryName: 'Chile' },
          { phoneCode: 86, countryName: 'China' },
          { phoneCode: 57, countryName: 'Colombia' },
          { phoneCode: 269, countryName: 'Comoros' },
          { phoneCode: 682, countryName: 'Cook Islands' },
          { phoneCode: 506, countryName: 'Costa Rica' },
          { phoneCode: 385, countryName: 'Croatia' },
          { phoneCode: 53, countryName: 'Cuba' },
          { phoneCode: 599, countryName: 'Curacao' },
          { phoneCode: 357, countryName: 'Cyprus' },
          { phoneCode: 420, countryName: 'Czech Republic' },
          { phoneCode: 235, countryName: 'Chad' }
        ]
      }
    }
  },
  components: {
    indexBar
  }
}
</script>
