function getConfig(){
  var config = cc.getConfig();

  config
    .newInfo()
    .setId('introduction')
    .setText(
      'Enter information for connecting to quantumleap.'
    );
  
  config
    .newTextInput()
    .setId('quantumleapUrl')
    .setName('QuantumLeap URL')
    .setHelpText('')
    .setPlaceholder("https://your-quantumleap:8668");

  config
    .newTextInput()
    .setId('fiwareService')
    .setName('FIWARE Service');

  config
    .newTextInput()
    .setId('fiwareServicePath')
    .setName('FIWARE Service Path')
    .setPlaceholder("/");

  config
    .newTextInput()
    .setId('entityId')
    .setName('Entity ID')
    .setHelpText('Entity Id')

  config
    .newTextInput()
    .setId('authHeaderName')
    .setName('Authorization Header Name')
    .setPlaceholder("Authorization");

  config
    .newTextInput()
    .setId('authHeaderValue')
    .setName('Authorization Value')
    .setHelpText('')
    .setPlaceholder("Bearer aaaabbbb-cccc-dddd-0000-111122223333");

  config
    .newInfo()
    .setId('attributeIntoroduction')
    .setText(
      'Enter the attribute name according to the attribute type'
    );  
  
  config
    .newTextInput()
    .setId('numberAttributes')
    .setName('Number Attributes')
    .setHelpText('Please write the attribute name of attribute type "Number" separated by commas.(ex. temperature,humidity,...)');
  
  config
    .newTextInput()
    .setId('floatAttributes')
    .setName('Float Attributes')
    .setHelpText('Please write the attribute name of attribute type "Float" separated by commas.(ex. temperature,humidity,...)');
  
  config
    .newTextInput()
    .setId('textAttributes')
    .setName('Text Attributes')
    .setHelpText('Please write the attribute name of attribute type "Text" separated by commas.(ex. name,address,...)');

  config
    .newTextInput()
    .setId('dateTimeAttributes')
    .setName('DateTime Attributes')
    .setHelpText('Please write the attribute name of attribute type "DateTime" separated by commas.(ex. updatedDateTime,createdDateTime,...)');  

  config
    .newTextInput()
    .setId('geoPointAttributes')
    .setName('geo:point Attributes')
    .setHelpText('Please write the attribute name of attribute type "geo: point" or "geo: json" separated by commas.(ex. location,geoLocation,...)');

  config
    .newTextInput()
    .setId('geoJsonAttributes')
    .setName('geo:json Attributes')
    .setHelpText('Please write the attribute name of attribute type "geo:json" separated by commas.(ex. location,geoLocation,...)')

  config
    .newTextInput()
    .setId('urlAttributes')
    .setName('URL Attributes')
    .setHelpText('Please write the attribute name of attribute type "URL" separated by commas.(ex. link,media,...)')
      
  config
    .newTextInput()
    .setId('structuredValueAttributes')
    .setName('structuredValue Attributes')
    .setHelpText('Please write the attribute name of attribute type "structuredValue" separated by commas.')

  config.setDateRangeRequired(true);
  return config.build()
}

function getFields(request){
  var fields = cc.getFields();
  var types = cc.FieldType;

  fields 
    .newDimension()
    .setId("id")
    .setName("id")
    .setType(types.TEXT)

  fields
    .newDimension()
    .setId("index")
    .setName("index")
    .setType(types.YEAR_MONTH_DAY_SECOND)

  if(request.configParams.numberAttributes){
    var numberAttributes = request.configParams.numberAttributes.split(",")
    for (var numberAttribute in numberAttributes){
      if (numberAttributes[numberAttribute] != null){
        fields
          .newDimension()
          .setId(numberAttributes[numberAttribute])
          .setName(numberAttributes[numberAttribute])
          .setType(types.NUMBER);
      }
    }
  }

  if(request.configParams.floatAttributes){
    var floatAttributes = request.configParams.floatAttributes.split(",");
    for (var floatAttribute in floatAttributes){
      if(floatAttributes[floatAttribute] != null){
        fields
          .newDimension()
          .setId(floatAttributes[floatAttribute])
          .setName(floatAttributes[floatAttribute])
          .setType(types.NUMBER);
      }
    }
  }

  if(request.configParams.textAttributes){
    var textAttributes = request.configParams.textAttributes.split(",");
    for (var textAttribute in textAttributes){
      if (textAttributes[textAttribute] != null){
        fields
          .newDimension()
          .setId(textAttributes[textAttribute])
          .setName(textAttributes[textAttribute])
          .setType(types.TEXT);
      }
    }
  }

  if(request.configParams.dateTimeAttributes){
    var dateTimeAttributes = request.configParams.dateTimeAttributes.split(",");
    for (var dateTimeAttribute in dateTimeAttributes){
      if (dateTimeAttributes[dateTimeAttribute] != null){
        fields
          .newDimension()
          .setId(dateTimeAttributes[dateTimeAttribute])
          .setName(dateTimeAttributes[dateTimeAttribute])
          .setType(types.YEAR_MONTH_DAY_SECOND);
      }
    }
  }

  if(request.configParams.geoPointAttributes){
    var geoPointAttributes = request.configParams.geoPointAttributes.split(",");
    for (var geoPointAttribute in geoPointAttributes){
      if (geoPointAttributes[geoPointAttribute] != null){
        fields
          .newDimension()
          .setId(geoPointAttributes[geoPointAttribute])
          .setName(geoPointAttributes[geoPointAttribute])
          .setType(types.LATITUDE_LONGITUDE);
      }
    }
  }
  
  if(request.configParams.geoJsonAttributes) {
    var geoJsonAttributes = request.configParams.geoJsonAttributes.split(",");
    for (var geoJsonAttribute in geoJsonAttributes){
      if (geoJsonAttributes[geoJsonAttribute] != null){
        fields
          .newDimension()
          .setId(geoJsonAttributes[geoJsonAttribute])
          .setName(geoJsonAttributes[geoJsonAttribute])
          .setType(types.LATITUDE_LONGITUDE);
      }
    }
  }

  if(request.configParams.urlAttributes){
    var urlAttributes = request.configParams.urlAttributes.split(",");
    for (var urlAttribute in urlAttributes){
      if (urlAttributes[urlAttribute] != null){
        fields
          .newDimension()
          .setId(urlAttributes[urlAttribute])
          .setName(urlAttributes[urlAttribute])
          .setType(types.TEXT);
      }
    }
  }
  
  if(request.configParams.structuredValueAttributes){
    var structuredValueAttributes = request.configParams.structuredValueAttributes.split(",")
    for (var structuredValue in structuredValueAttributes){
      if (structuredValueAttributes[structuredValue] != null ){
        fields
          .newDimension()
          .setId(structuredValueAttributes[structuredValue])
          .setName(structuredValueAttributes[structuredValue])
          .setType(types.URL);
      }
    }
  }
  return fields;
}

function getSchema(request){
  return {schema: getFields(request).build()};
}

function getData(request){
  var requestedFields = getFields(request).forIds(
    request.fields.map(function(field) {
      return field.name;
    })
  );
  try {
    var apiResponse = getDataFromApi(request);
    var data = getFormattedData(request, apiResponse, requestedFields);
  } catch (e) {
    cc.newUserError()
      .setDebugText('Error fetching data from API. Exception details: ' + e)
      .setText(
        'The connector has encountered an unrecoverable error. Please try again later, or file an issue if this error persists.'
      )
      .throwException();
  }

  return {
    schema: requestedFields.build(),
    rows: data
  }  
}

function getDataFromApi(request) {
  var url = request.configParams.quantumleapUrl + "/v2/entities/" + request.configParams.entityId + "?limit=1000";
  var options = {
    method: "get",
    headers: {
      [request.configParams.authHeaderName]: request.configParams.authHeaderValue,
      "Fiware-Service": request.configParams.fiwareService,
      "Fiware-ServicePath": request.configParams.fiwareServicePath
    }
  }
  try {
    var response = UrlFetchApp.fetch(url, options);
    return JSON.parse(response.getContentText());
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

function getFormattedData(request, response, requestedFields) {
  var data = [];
  var entityLists = []
  for (var index in response["index"]){
    var checkData = {};
    checkData["id"] = response["entityId"];
    checkData["index"] = response["index"][index]
    for (var attribute in response["attributes"]){
      checkData[response["attributes"][attribute]["attrName"]] = response["attributes"][attribute]["values"][index]
    }
    entityLists.push(checkData);
  }
  entityLists.forEach(function(checkData){
    var row = [];
    requestedFields.asArray().forEach(function (attrName) {
      if (attrName.getId() == "id") {
        row.push(checkData["id"]);
      }else if(attrName.getId() == "index") {
        var indexDateTime = Utilities.formatDate(new Date(checkData["index"]), "JST", "yyyyMMddHHmmss");
        row.push(indexDateTime);
      }else if(attrName.getId()){
        if(checkAttributeType(request, attrName.getId(), "numberAttributes") ||
           checkAttributeType(request, attrName.getId(), "floatAttributes") ||
           checkAttributeType(request, attrName.getId(), "textAttributes") ||
           checkAttributeType(request, attrName.getId(), "geoPointAttributes") ||
           checkAttributeType(request, attrName.getId(), "urlAttributes")){
          row.push(checkData[attrName.getId()]);
        }else if(checkAttributeType(request, attrName.getId(), "dateTimeAttributes")){
          var attributeDateTime = Utilities.formatDate(new Date(checkData[attrName.getId()]), "JST", "yyyyMMddHHmmss");
          row.push(attributeDateTime);
        }else if(checkAttributeType(request, attrName.getId(), "geoJsonAttributes")){
          row.push(checkData[attrName.getId()]["coordinates"][1] + "," + checkData[attrName.getId()]["coordinates"][0])
        }else if(checkAttributeType(request, attrName.getId(), "structuredValueAttributes")){
          row.push(null);
        }else{
          if (attrName.getType() == cc.FieldType.TEXT) {
            row.push("");
          }else if (attrName.getType() == cc.FieldType.YEAR_MONTH_DAY_HOUR) {
            row.push(null);
          }else if (attrName.getType() == cc.FieldType.LATITUDE_LONGITUDE) {
            row.push(null);
          }else {
            row.push(0);
          }
        }
      }else {
          if (attrName.getType() == cc.FieldType.TEXT) {
            row.push("");
          }else if (attrName.getType() == cc.FieldType.YEAR_MONTH_DAY_HOUR) {
            row.push(null);
          }else if (attrName.getType() == cc.FieldType.LATITUDE_LONGITUDE) {
            row.push(null);
          }else {
            row.push(0);
          }
      };
    });
    data.push({"values": row})
  });
  return data;
}

function checkAttributeType(request, attrName, attributeType){
  var check = false
  if(attributeType == "numberAttributes"){
    if(request.configParams.numberAttributes){
      var numberAttributes = request.configParams.numberAttributes.split(",");
      for (var numberAttribute in numberAttributes){
        if(numberAttributes[numberAttribute] == attrName){
           check = true;
        }
      }
    }
  }else if(attributeType == "floatAttributes"){
    if(request.configParams.floatAttributes){
      var floatAttributes = request.configParams.floatAttributes.split(",")
      for (var floatAttribute in floatAttributes){
        if(floatAttributes[floatAttribute] == attrName){
           check = true
        }
      }
    }
  }else if(attributeType == "textAttributes"){
    if(request.configParams.textAttributes){
      var textAttributes = request.configParams.textAttributes.split(",")
      for (var textAttribute in textAttributes){
        if(textAttributes[textAttribute] == attrName){
           check = true
        }
      }
    }
  }else if(attributeType == "dateTimeAttributes"){
    if(request.configParams.dateTimeAttributes){
      var dateTimeAttributes = request.configParams.dateTimeAttributes.split(",")
      for (var dateTimeAttribute in dateTimeAttributes){
        if(dateTimeAttributes[dateTimeAttribute] == attrName){
           check = true
        }
      }
    }
  }else if(attributeType == "geoPointAttributes"){
    if(request.configParams.geoPointAttributes){
      var geoPointAttributes = request.configParams.geoPointAttributes.split(",")
      for (var geoPointAttribute in geoPointAttributes){
        if(geoPointAttributes[geoPointAttribute] == attrName){
           check = true
        }
      }
    }
  }else if(attributeType == "geoJsonAttributes"){
    if(request.configParams.geoJsonAttributes){
      var geoJsonAttributes = request.configParams.geoJsonAttributes.split(",")
      for (var geoJsonAttribute in geoJsonAttributes){
        if(geoJsonAttributes[geoJsonAttribute] == attrName){
           check = true
        }
      }
    }
  }else if(attributeType == "urlAttributes"){
    if(request.configParams.urlAttributes){
      var urlAttributes = request.configParams.urlAttributes.split(",")
      for (var urlAttribute in urlAttributes){
        if(urlAttributes[urlAttribute] == attrName){
           check = true
        }
      }
    }
  }else if(attributeType == "structuredValueAttributes"){
    if(request.configParams.structuredValueAttributes){
      var structuredValueAttributes = request.configParams.structuredValueAttributes.split(",")
      for (var structuredValueAttribute in structuredValueAttributes){
        if(structuredValueAttributes[floatAttribute] == attrName){
           check = true
        }
      }
    }
  }
  return check
}


function isAdminUser() {
  return false;
}

