Option Explicit
Dim sh, killFile
Set sh = CreateObject("WScript.Shell")

' Acil çıkış dosyası
killFile = sh.ExpandEnvironmentStrings("%temp%") & "\stop_hackendiniz.lock"

Do While True

    ' Eğer kill dosyası varsa tamamen çık
    If CreateObject("Scripting.FileSystemObject").FileExists(killFile) Then
        On Error Resume Next
        CreateObject("Scripting.FileSystemObject").DeleteFile killFile, True
        WScript.Quit
    End If

    ' YouTube aç
    sh.Run "https://www.youtube.com/results?search_query=istiklal+marşı", 1, False
    WScript.Sleep 2000

    ' Tam ekran yazı
    sh.Run "mshta.exe ""javascript:" & _
      "var w=screen.width,h=screen.height;" & _
      "window.moveTo(0,0);window.resizeTo(w,h);" & _
      "document.body.style.margin='0';" & _
      "document.body.style.background='black';" & _
      "document.body.style.display='flex';" & _
      "document.body.style.alignItems='center';" & _
      "document.body.style.justifyContent='center';" & _
      "document.body.innerHTML='<div style=" & _
      "'font-family:Segoe UI,Arial;" & _
      "font-weight:900;" & _
      "font-size:120px;" & _
      "letter-spacing:4px;" & _
      "color:white;" & _
      "'>HACKENDİNİZ</div>';" & _
      "document.onkeydown=function(e){" & _
      "e=e||window.event;" & _
      "if(e.ctrlKey && e.shiftKey && e.keyCode==81){" & _
      "var f=new ActiveXObject(""Scripting.FileSystemObject"");" & _
      "var t=new ActiveXObject(""WScript.Shell"").ExpandEnvironmentStrings(""%temp%"");" & _
      "f.CreateTextFile(t+""\\stop_hackendiniz.lock"",true);" & _
      "window.close();" & _
      "}" & _
      "};" & _
      "close();""", 1, True

    WScript.Sleep 1000
Loop