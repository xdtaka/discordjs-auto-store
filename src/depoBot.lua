
script = [[
   banNepalFlag = true
   banSpam = true
   banMsg = true
   sendNotif =true -- if true bot will send webhook
   
   webhook = "a nigga stole my webhook"
   
   
   --Custom Your Webhook here (pfp, color, name)
   function sendWebhook(text)
       webhook = Webhook.new(webhook)
       webhook.username = "Depo Log"

       webhook.embed1.use = true
       webhook.embed1.title = "Deposit Logged!"
       webhook.embed1.description = text
       webhook.embed1.color = "0x43A4F6"
       webhook:send()
   end
   
   
   function string:removeColors()
       return self:gsub("`.", '')
   end
   
   addEvent(Event.variantlist, function(variant, netid)
   if variant:get(0):getString() == "OnConsoleMessage" then
      local body = variant:get(1):getString()
      local content = removeColor(body)
      local vtext = variant:get(1):getString()
      if vtext:find("```5") and not vtext:find("SB") and not vtext:find("CB") and not vtext:find("BC") then
         content = removeColor(variant:get(1):getString())
         local name = content:match("%[%[(.-) places")
         local amount = content:match("places (%d+)")
         local item = content:match("places "..amount.." (.+) into")
         if item:lower():find("lock") and amount and name then
            if sendNotif then
               sendWebhook(name .. " Deposited **"  .. amount .. "** "..  item )
            end
            if item:lower():find("diamond lock") then
               amount = amount * 100
            elseif item:lower():find("world lock") then
               amount = amount
            elseif item:lower():find("blue gem lock") then
               amount = amount * 100 * 100
            end
         growid = name
         amount = amount
         getBot():say("Thank you")
         local curlCommand = 'curl -X POST http://localhost:3000/addbalance/'..growid..'/'..amount
         local exitCode = os.execute(curlCommand)
		 print(exitCode)
        else
         getBot():say("/ban " .. name)
        end
      end
      if vtext:find("CT:[W]",1,true) then
       stringa = variant:get(1):getString()
       stringa = stringa:removeColors()
       nameofuser = string.match(stringa, "<(.-)>")
       textofuser = stringa:gsub(nameofuser, ""):match("<> (.+)")
       if banSpam and textofuser:lower():find("bot off") or textofuser:lower():find("bot") or textofuser:lower():find("depo") or textofuser:lower():find("donate to") or textofuser:lower():find("gas") or textofuser:lower():find("qq") or textofuser:lower():find("drop") or textofuser:lower():find("cheap") then
        if sendNotif then
         sendWebhook("Spammer banned [ " .. nameofuser .. " ]")
        end
        getBot():say("/ban " .. nameofuser)
       end
      end

   
   elseif variant:get(0):getString() == "OnSpawn" then
    if RTVAR.new(variant:get(1):getString()):get("country") == "np" and banNepalFlag then
      getBot():say("/ban "..removeColor(rtvar:get("name")))
      if sendNotif then
         sendWebhook("Nepal Flag Banned [ " .. removeColor(rtvar:get("name")) .. " ]")
      end
    end
   end
   
   end)
   
   listenEvents(9999999)
   
]]

if not getBot(1):isRunningScript() then
   getBot(1):runScript(script)
end

server = HttpServer.new()

server:setLogger(function(request, response)
  print(string.format("Method: %s, Path: %s, Status: %i", request.method, request.path, response.status))
end)

server:get("/bot/get", function(request, response)
   local function encodeJson(data)
      local jsonString = "{"
      local isFirst = true
  
      for key, value in pairs(data) do
          if not isFirst then
              jsonString = jsonString .. ","
          end
          isFirst = false
  
          jsonString = jsonString .. '"' .. tostring(key) .. '":'
  
          if type(value) == "table" then
              jsonString = jsonString .. encodeJson(value)
          elseif type(value) == "string" then
              jsonString = jsonString .. '"' .. value .. '"'
          else
              jsonString = jsonString .. tostring(value)
          end
      end
  
      return jsonString .. "}"
  end
  local responseData = {
      botName = getBot(1).name,
      botStatus = (getBot(1).status == BotStatus.online) and "Online" or "Offline",
      world = getBot(1):getWorld().name
   }

   local jsonResponse = encodeJson(responseData)
   print(jsonResponse)
   response:setContent(jsonResponse)
end)

server:listen("0.0.0.0", 80)



